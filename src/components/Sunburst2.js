import React , {useState , useEffect} from 'react';
import * as d3 from 'd3';
import Complete from './Complete.js'

const configChart = [
    {
        innerRadius: 100,
        outerRadius: 150,
        color: '#FFB9B0',
        key: 'subject'
    },
    {
        innerRadius: 170,
        outerRadius: 220,
        color: '#99D4DF',
        key: 'verb'
    },
    {
        innerRadius: 240,
        outerRadius: 290,
        color: '#A088CF',
        key: 'object'
    },
];

const clickSentences = (el) => {
    const sentenceId = el.currentTarget.className;

    (async () => {
        const res = await fetch(`http://localhost:5000/sentence=${sentenceId}`);
        const {rows} = await res.json();
    })()
};

/*let originalData;

const changeRange = () => {
    let rangeSubject = 5;

    d3.select('.graph-range_subject').on('input', function() {

    });
}*/

const Sunburst2 = ({data}) => {
    // const [isLoading, statusLoading] = useState(true);
    const [selectedSubject , changeSubject] = useState('');
    const [selectedVerb , changeVerb] = useState('');
    const [selectedObject, changeObject] = useState('');
    const [sentences, setSentences] = useState([]);

    let subjectActive, verbActive, objectActive;

    useEffect(() => {
        const g = d3.select("g")
            .attr("transform", "translate(" + 600 / 2 + "," + 600 / 2 +")")
        renderGraph(g, 0);
    }, [])


    useEffect(() => {
        const g = d3.select("g")
        changeVerb('') // when subject is changed reset selected verb
        renderGraph(g, 1);
    }, [selectedSubject])

    useEffect(() => {
        const g = d3.select("g")
        changeObject('')
        renderGraph(g, 2);
    }, [selectedVerb])

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        if (!selectedObject) {
            return setSentences([])
        }
        (async () => {
            const res = await fetch(`http://localhost:5000/?subject=${selectedSubject}&verb=${selectedVerb}&object=${selectedObject}`)
            const { data } = await res.json();
            const allData = [];
            const maleData = [];
            const femaleData = [];
            let test = [];

            if(data.length > 1) {
                data.map((el, i) => {
                    if (el.json_agg.length > 1) {
                        if (el.gender === 'm') {
                            maleData.push(...el.json_agg);
                        } else if (el.gender === 'f') {
                            femaleData.push(...el.json_agg)
                        }
                        allData.push(...el.json_agg);
                    }
                });
                const total = maleData.length + femaleData.length;
                const percentMale = Math.round((100 * maleData.length) / total);
                const percentFemale = Math.round((100 * femaleData.length) / total);
                test.push(percentMale , percentFemale);

                var arc = d3.arc()
                    .outerRadius(100 - 10)
                    .innerRadius(0);

                var labelArc = d3.arc()
                    .outerRadius(100 - 40)
                    .innerRadius(100 - 40);

                var pie = d3.pie()
                    .sort(null)
                    .value(function(d) { return d; });

                var svg = d3.select(".sentences").append("svg")
                    .attr("width", 400)
                    .attr("height", 400)
                    .append("g")
                    .attr("transform", "translate(" + 400 / 2 + "," + 400 / 2 + ")");

                var g = svg.selectAll(".arc")
                    .data(pie(test))
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("fill", (d , i) => d.index === 0 ? 'blue': 'pink');

                g.append("text")
                    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                    .attr("dy", ".35em")
                    .text(function(d) { return d.data; });
            }
            setSentences(allData)
        })()
        document.querySelector('body').classList.add('sentences');
    }, [selectedObject])

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

        const t = d3.transition().duration(1000);

        const paths = groupChart.select("g:nth-child(1)")
                    .selectAll('path')
                    .data(arcData)


        paths.exit()
            .transition(t)
            .attr('opacity', 0)
            .remove() // remove arc when not needed

            paths.enter()
                .append("path")
                    .merge(paths)
                    .attr("fill", configChart[i].color)
                    .attr("id", d => configChart[i].key + d.index)
                    .attr("d", arcGenerator)
                    .on('click', (d, index, nodes) => {
                        const {subject , verb, object , count} = d.data;
                        let textActive;

                        // Update value of selected subject and verb
                        if (i === 0) {
                            textActive = 'subject';
                            changeSubject(subject);
                        }
                        if (i === 1) {
                            textActive = 'verb';
                            changeVerb(verb);
                        }
                        if (i === 2) {
                            textActive = 'object';
                            changeObject(object)
                        }


                        nodes.forEach(node => node.classList.remove(`${textActive}-active`)); // reset the previous one

                        d3.select(nodes[index]).attr('class' , `${textActive}-active`);
                        if(nodes[index].id.includes('subject')){
                            subjectActive = nodes[index].id;
                        }

                        // Update text of middle circle
                        const middleText = [subject, verb, object][i];
                        d3.select('#middle text > tspan:nth-child(1)').attr('fill', configChart[i].color).text(middleText);
                        d3.select('#middle text > tspan:nth-child(2)').attr('fill', configChart[i].color).text(`x${count}`)
                    })
                    .on('mouseover', (d, i , nodes) => {
                        const {verb , object} = d.data;
                        const hoverColor = object ? '#855CD6' : verb ? '#65C6D7' : '#FF8378';
                        d3.select(nodes[i]).transition()
                        .attr('duration', 500)
                        .attr('fill', hoverColor)
                    })
                    .on('mouseout', (d, i, nodes) => {
                        const {verb , object} = d.data;
                        const hoverColor = object ? '#A088CF' : verb ? '#99D4DF' : '#FFB9B0';

                        d3.select(nodes[i]).transition()
                         .attr('duration', 5000)
                         .attr('fill', hoverColor)
                    })
                    .transition(t)

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
                    .attr('fill', '#FFFFFF')
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
    //
    // if(isLoading){
    //     return(
    //         <h3>Loading ...</h3>
    //     )
    // }
    return(
        <section className="graphSvg">
{/*
            <input type="range" min="1" max="10" defaultValue={rangeSubject} className="graph-range_subject"/>
*/}
            <div className="sunburst">
                <svg width={600} height={600}>
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
            <ul className="sentences">
                {sentences.map((sentence, i) =>
                    <li key={i} className={sentence.f2} onClick={clickSentences}>{sentence.f1}</li>
                )}
                {/* {sentences.sort(() => 0.5 - Math.random())[0]} */}
            </ul>
             <Complete
                 subject={selectedSubject}
                 verb={selectedVerb}
                 object={selectedObject}
             />
        </section>
    )
}

export default Sunburst2;

