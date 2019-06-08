import React , {useState , useEffect} from 'react';
import * as d3 from 'd3';
/* import Complete from './Complete.js' */


const configChart = [
    {
        innerRadius: 100,
        outerRadius: 150,
        key: 'subject'
    },
    {
        innerRadius: 170,
        outerRadius: 220,
        key: 'verb'
    },
    {
        innerRadius: 240,
        outerRadius: 290,
        key: 'object'
    },
]


let data;

const Sunburst2 = () => {
    const [isLoading, statusLoading] = useState(true);
    const [selectedSubject , changeSubject] = useState('');
    const [selectedVerb , changeVerb] = useState('');
    let subjectActive, verbActive, objectActive;
          

    useEffect(() => {
        const fetchData = async() => {    
            const res = await fetch('http://localhost:5000/all');
            
            ({data} = await res.json());
            statusLoading(false);

            const g = d3.select("g")
                    .attr("transform", "translate(" + 800 / 2 + "," + 800 / 2 +")") 
            renderGraph(g, 0);               
        }
        fetchData();
    }, [])


    useEffect(() => {
        const g = d3.select("g")
        changeVerb('') // when subject is changed reset selected verb
        renderGraph(g, 1);
    }, [selectedSubject])

    useEffect(() => {
        const g = d3.select("g")
        renderGraph(g, 2);
    }, [selectedVerb])

    const renderGraph = (g, i) => {
        if (!data) return

        const groupChart = g.select(`#${configChart[i].key}`);
        const arcGenerator = d3.arc()
            .innerRadius(configChart[i].innerRadius)
            .outerRadius(configChart[i].outerRadius)
            .padAngle(.009)

        const arcData = d3.pie()
            .value(d => d.count)
            (data[i].filter(({subject, verb , object}) => {
                if (i === 0) {
                    return true
                }
                if (i === 1) {
                    return subject === selectedSubject
                }
                if (i === 2) {
                    return subject === selectedSubject && verb === selectedVerb
                }
            }))

        const paths = groupChart.select("g:nth-child(1)")
                    .selectAll('path')
                    .data(arcData)
                
            paths.exit().remove() // remove arc when not needed

            paths.enter()
                .append("path")
                    .merge(paths)
                    .attr("fill", '#FFB9B0')
                    .attr('transition', '0.5s')
                    .attr("id", d => configChart[i].key + d.index)
                    .attr("d", arcGenerator)
                    .on('click', (d, index, nodes) => {
                        const {subject , verb, object , count} = d.data;

                        // Update value of selected subject and verb
                        if (i === 0) {
                            changeSubject(subject);
                        }
                        if (i === 1) {
                            changeVerb(verb);
                        }

                        
                        nodes.forEach(node => node.classList.remove('active')) // reset the previous one
                        subjectActive && d3.select(`#${subjectActive}`).attr('class', '');
                        d3.select(nodes[index]).attr('class' , 'active');

                        if(nodes[index].id.includes('subject')){
                            subjectActive = nodes[index].id;
                        }

                        // Update text of middle circle
                        const middleText = [subject, verb, object][i]
                        d3.select('#middle text > tspan:nth-child(1)').text(middleText)
                        d3.select('#middle text > tspan:nth-child(2)').text(`x${count}`)
                    })
                    .on('mouseover', (d, i , nodes) => {
                        d3.select(nodes[i]).transition()
                        .attr('duration', 500)
                        .attr('fill', '#FF8378')
                    })
                    .on('mouseout', (d, i, nodes) => d3.select(nodes[i]).transition().attr('fill', '#FFB9B0'))

        const texts = groupChart.select("g:nth-child(2)")
                    .selectAll("text")
                    .data(arcData)

                texts.exit().remove()

                texts.enter().append("text")
                    .merge(texts)
                    .attr("transform", function(d) {
                        const [ x, y ] = arcGenerator.centroid(d)
                        return `translate(${x},${y})`
                    })
                    .attr('pointer-events', 'none')
                    .text(({ startAngle, endAngle, data}) =>
                        endAngle - startAngle > 0.15 ? data[configChart[i].key] : '.'
                    )

        
        if(i === 0){
            const circleR = 75;
            g.select('#middle circle')
             .attr('r', circleR)
             .attr('cx', circleR)
             .attr('cy', circleR)
             .attr('fill', '#F4F4F4')
             .attr("transform", `translate(-${circleR}, -${circleR})`);

            g.select('#middle text')
             .attr('text-anchor', 'middle')
             .attr('fill', '#000')

            g.select('#middle text > tspan:nth-child(1)')
                .data(arcData)
                .text((d , i , nodes) => d.data.subject)

            g.select('#middle text > tspan:nth-child(2)')
                .data(arcData)
                .text((d , i , nodes) => `x${d.data.count}`)
        }
    }

    if(isLoading){
        return(
            <h3>Loading ...</h3>
        )
    }    
    return(
        <div>
            <div className="sunburst">
                <svg width={800} height={800}>
                    <g>
                        <g id="middle">
                            <circle/>
                            <text x="0" y="-20px" className="sunburst-desc">
                                <tspan x="0" dy="0"></tspan>
                                <tspan x="0" dy="30px"></tspan>
                                <tspan x="0" dy="30px">times</tspan>
                            </text>
                        </g>
                        <g id="subject">
                            <g />
                            <g />
                        </g>
                        <g id="verb">
                            <g />
                            <g />
                        </g>
                        <g id="object">
                            <g />
                            <g />
                        </g>
                    </g>
                </svg>
            </div>
            {/* <Complete/> */}
        </div>
    )
}

export default Sunburst2;

