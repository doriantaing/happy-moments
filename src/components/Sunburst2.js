import React , {useState , useEffect, useRef} from 'react';
import * as d3 from 'd3';
import Complete from './Complete.js'
import bodymovin from 'lottie-web'

const genders = {
    m: 'Man',
    f: 'Woman'
}

const configChart = [
    {
        innerRadius: 60,
        outerRadius: 60 + 60,
        color: '#FFB9B0',
        key: 'subject'
    },
    {
        innerRadius: 60 + 60 + 10,
        outerRadius: 60 + 60 + 10 + 60,
        color: '#99D4DF',
        key: 'verb'
    },
    {
        innerRadius: 60 + 60 + 10 + 60 + 10,
        outerRadius: 60 + 60 + 10 + 60 + 10 + 60,
        color: '#A088CF',
        key: 'object'
    },
];

const size = configChart[configChart.length -1].outerRadius * 2

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

// const prevArcDataRef = { current: [] }

const Sunburst2 = ({data}) => {
    // let svgContainer = document.querySelector('.row.jc-center');
    // let animItem = bodymovin.loadAnimation({
    //     wrapper: svgContainer,
    //     animType: 'svg',
    //     loop: true,
    //     path: "https://raw.githubusercontent.com/thesvbd/Lottie-examples/master/assets/animations/pause.json"
    // });

    const activeIntervalRef = useRef()
    const prevArcDataRef = useRef([])

    // const [isLoading, statusLoading] = useState(true);
    const [selectedSubject , changeSubject] = useState('');
    const [selectedVerb , changeVerb] = useState('');
    const [selectedObject, changeObject] = useState('');
    const [sentences, setSentences] = useState([]);
    const [sentence, randomSentences] = useState('');

    let subjectActive, verbActive, objectActive;
    const generateRandomSentences = data => {
        if(data.length > 0){
            var randomPhrase = Math.floor(Math.random() * (data.length - 1));
            var random = data[randomPhrase]
            randomSentences(random);
        }
    };

    useEffect(() => {
        const g = d3.select("g")
            .attr("transform", "translate(" + size / 2 + "," + size / 2 +")")
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

        if (!selectedObject) {
            return setSentences([])
        }
        (async () => {
            const res = await fetch(`http://localhost:5000/props?subject=${selectedSubject}&verb=${selectedVerb}&object=${selectedObject}`)
            const { data } = await res.json();
            /*const allData = [];
            const maleData = [];
            const femaleData = [];
            let test = [];*/

            if(data.length > 0) {
                // data.map((el, i) => {
                //     if (el.json_agg.length > 1) {
                //         if (el.gender === 'm') {
                //             maleData.push(...el.json_agg);
                //         } else if (el.gender === 'f') {
                //             femaleData.push(...el.json_agg)
                //         }
                //         allData.push(...el.json_agg);
                //     }
                // });
                setSentences(data)

                /*const total = maleData.length + femaleData.length;
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
                    .text(function(d) { return d.data; });*/
            }
        })()
        document.querySelector('body').classList.add('sentences');
    }, [selectedObject])

    useEffect(() => {
        if (activeIntervalRef.current) {
            window.clearInterval(activeIntervalRef.current)
            activeIntervalRef.current = null
        }

        generateRandomSentences(sentences);
        activeIntervalRef.current = setInterval(() => generateRandomSentences(sentences),1000);

        renderGraph(d3.select("g"), 2)
    }, [sentences])

    const renderGraph = (g, i) => {
        if (!data) return

        const groupChart = g.select(`#${configChart[i].key}`);
        const t = d3.transition().duration(800);
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
            }));


        const pathsGroup = groupChart.select("g:nth-child(1)")

        // pathsGroup
        //     .transition(t)
        //     .attr('transform', d => `rotate(0)`)

        const paths = pathsGroup
                .selectAll('path')
                .data(arcData)

        paths.exit()
            // .transition(t)
            // .attr('opacity', 0)
            .transition()
            .duration(800)
            // .delay((_, i) => i * 200)
             .attrTween('d', d => {
                 const interpolate = d3.interpolate(d.endAngle, d.startAngle)
                 return d2 => {
                     d.endAngle = interpolate(d2)
                     return arcGenerator(d)
                 }
             })
            .remove() // remove arc when not needed

            paths.enter()
                .append("path")
                    .merge(paths)
                    .attr("fill", configChart[i].color)
                    .attr("id", d => configChart[i].key + d.index)
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
                        if (i === 2) {textActive = 'object';
                            changeObject(object);
                            if (object === selectedObject) {
                                if (activeIntervalRef.current) {
                                    window.clearInterval(activeIntervalRef.current)
                                    activeIntervalRef.current = null
                                } else {
                                    generateRandomSentences(sentences);
                                    activeIntervalRef.current = setInterval(() => generateRandomSentences(sentences),1000)
                                }
                            }
                            /*renderGraph(d3.select("g"), 2)*/

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
                        const pathsGroup = groupChart.select("g:nth-child(1)")
                            pathsGroup.transition().duration(800)
                                .attr('transform', `rotate(${-  d.startAngle * (180 / Math.PI)})`)

                            const textsGroup = groupChart.select("g:nth-child(2)");
                            const textsItems = groupChart.selectAll("g:nth-child(2) > text");

                            textsGroup.transition().duration(800)
                                .attr('transform', () => {
                                    return `rotate(${-d.startAngle * (180 / Math.PI)})`;
                                });

                            textsItems.transition().duration(800)
                               .attr('transform', function(l) {
                                   const [ x, y ] = arcGenerator.centroid(l);
                                   return `translate(${x},${y}) rotate(${d.startAngle * (180 / Math.PI)})`
                           })
                    })
                    .on('mouseover', (d, i , nodes) => {
                        const {verb , object} = d.data;
                        const hoverColor = object ? '#855CD6' : verb ? '#65C6D7' : '#FF8378';
                        d3.select(nodes[i])
                        //     .transition()
                        // .attr('duration', 500)
                        .attr('fill', hoverColor)
                    })
                    .on('mouseout', (d, i, nodes) => {
                        const {verb , object} = d.data;
                        const hoverColor = object ? '#A088CF' : verb ? '#99D4DF' : '#FFB9B0';

                        d3.select(nodes[i])
                            // .transition()
                            // .attr('duration', 5000)
                         .attr('fill', hoverColor)
                    })
                    .transition()
                    .duration(800)
                    // .delay((_, i) => i * 200)
                    .attrTween('d', (d, i) => {
                        const prevStartAngle = prevArcDataRef.current[i] && prevArcDataRef.current[i].startAngle
                        const prevEndAngle = prevArcDataRef.current[i] && prevArcDataRef.current[i].endAngle

                        const interpolateStartAngle = d3.interpolate(prevStartAngle || d.startAngle, d.startAngle)
                        const interpolateEndAngle = d3.interpolate(prevEndAngle || d.startAngle, d.endAngle)


                        return d2 => {
                            d.startAngle = interpolateStartAngle(d2)
                            d.endAngle = interpolateEndAngle(d2)
                            return arcGenerator(d)
                        }
                        return arcGenerator(d);
                    })

        /*.attr("d", arcGenerator)*/

        const textsGroup = groupChart.select("g:nth-child(2)")
        // textsGroup
        //     .transition(t)
        //     .attr('transform', d => `rotate(0)`)

        const texts = textsGroup
                    .selectAll("text")
                    .data(arcData)

                texts.exit().remove()

                texts.enter().append("text")
                    .merge(texts)
                    .transition().duration(800)
                    .attr("transform", function(d) {
                        const [ x, y ] = arcGenerator.centroid(d)
                        return `translate(${x},${y}) rotate(${d.startAngle * (180 / Math.PI)})`
                    })
                    .attr('fill', '#FFFFFF')
                    .attr('pointer-events', 'none')
                    .text(({ startAngle, endAngle, data}) =>
                        endAngle - startAngle > 0.15 ? data[configChart[i].key] : '.'
                    );


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

        window.setTimeout(() => prevArcDataRef.current = arcData, 800)

    }

    return(
        <section className="graphSvg">
            <div className="graph-svg-inner">

                <div className="sentences">
                    {sentence &&
                    <p>{sentence.cleaned_hm}</p>
                    }
                </div>

                <div className="sunburst">
                    <svg width={size} height={size}>
                        <g>
                            <g id="middle">
                                <circle/>
                                <text x="0" y="-20px" className="sunburst-desc">
                                    <tspan x="0" dy="0"></tspan>
                                    <tspan x="0" dy="25px"></tspan>
                                    <tspan x="0" dy="25px">times</tspan>
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
            </div>

            {sentence &&
             <div className="sentence-boxes">
                <div className="boxes-container boxes-container-1">
                    <div className="box">
                        <div className="title mb-20">Gender</div>
                        <div className="image mt-30">
                            { sentence.gender == "m" ?
                                <img src={process.env.PUBLIC_URL + '/img/male.svg'}/>
                            :
                                <img src={process.env.PUBLIC_URL + '/img/female.svg'}/>
                            }
                        </div>
                        <div className="ta-c c-black text-sm mt-10">{genders[sentence.gender]}</div>
                    </div>
                    <div className="box mt-100">
                        <div className="title mb-20">Country</div>
                        <div className="image mt-30">
                            <img src={process.env.PUBLIC_URL + '/img/world.svg'}/>
                        </div>
                        <div className="ta-c c-black text-sm mt-10">{sentence.country}</div>
                    </div>
                </div>


                <div className="boxes-container boxes-container-2">
                    <div className="box">
                        <div className="title mb-20">Age</div>
                        <div className="ta-c mt-30">
                        {sentence.age}
                        </div>
                        <div className="ta-c c-black text-sm mt-10">years old</div>
                    </div>
                    <div className="box mt-100">
                        <div className="title mb-20">Married</div>
                        <div className="image mt-30">
                            <img src={process.env.PUBLIC_URL + '/img/maried.svg'}/>
                        </div>
                        <div className="ta-c c-black text-sm mt-10">{sentence.marital}</div>
                    </div>
                </div>
             </div>
            }


             <Complete
                 subject={selectedSubject}
                 verb={selectedVerb}
                 object={selectedObject}
             />
        </section>
    )
}

export default Sunburst2;

