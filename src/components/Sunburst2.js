import React , {useState , useEffect} from 'react';
import * as d3 from 'd3';
import Complete from './Complete.js'


const configChart = [
    {
        innerRadius: 100,
        outerRadius: 150,
        key: 'subject'
    },
    {
        innerRadius: 200,
        outerRadius: 250,
        key: 'verb'
    },
    {
        innerRadius: 300,
        outerRadius: 350,
        key: 'object'
    },
]


let data

const Sunburst2 = () => {

    const [selectedSubject , changeSubject] = useState('');

    useEffect(() => {
        const fetchData = async() => {    
            const res = await fetch('http://localhost:5000/all');
            
            ({data} = await res.json());

            const g = d3.select("g")
                    .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 +")") 
            renderGraph(g, 0);               
        }
        fetchData();
    }, [])


    useEffect(() => {
        const g = d3.select("g")
                    .attr("transform", "translate(" + 500 / 2 + "," + 500 / 2 +")")
        if (selectedSubject) renderGraph(g, 1);
    }, [selectedSubject])

    const renderGraph = (g, i) => { 
        const groupChart = g.select(`#${configChart[i].key}`);

        const arcGenerator = d3.arc()
            .innerRadius(configChart[i].innerRadius)
            .outerRadius(configChart[i].outerRadius)
            .padAngle(.01)

        const arcData = d3.pie()
            .value(d => d.count)
            (data[i].filter(({subject, verb}) => {
                if(verb){
                    return subject === selectedSubject
                }
                return true;
            }))

        const paths = groupChart.select("g:nth-child(1)")
                    .selectAll('path')
                    .data(arcData)
                
            paths.enter()
                .append("path")
                    .merge(paths)
                    .attr("fill", 'grey')
                    .attr("d", arcGenerator)
                    .on('mouseover', (d, index, nodes) => {
                        i === 0 && changeSubject(d.data.subject);
                        d3.select(nodes[index]).attr('fill', 'blue')
                    })
                    .on('mouseout', (d, i, nodes) => d3.select(nodes[i]).attr('fill', 'grey'))      

        const texts = groupChart.select("g:nth-child(2)")
                    .selectAll("text")
                    .data(arcData)

                texts.enter().append("text")
                    .merge(texts)
                    .attr("transform", function(d) {
                        const [ x, y ] = arcGenerator.centroid(d)
                        return `translate(${x},${y})`
                    })
                    .text(({ startAngle, endAngle, data}) =>
                        endAngle - startAngle > 0.15 ? data[configChart[i].key] : '.'
                    )
                
 
    }
        
    return(
        <div>
            <div className="sunburst">
                <svg width={500} height={500}>
                <g>
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

