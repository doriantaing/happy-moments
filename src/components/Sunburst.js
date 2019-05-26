import React , {Component} from 'react';
import * as d3 from 'd3';
import {merged , subjects} from '../helpers/dataFile';
import Complete from './Complete.js'

class Sunburst extends Component {
    state = {
        svoData: null,
        isLoading: true,
        selectedSubject: null,
        selectedVerb: null,
    };

    async componentDidMount() {
        const res = await fetch('http://localhost:5000/all');
        const {data} = await res.json();
        
        this.setState({
            svoData: data,
            isLoading: false
        });
        this.renderData(subjects);
    }

    async renderData(getData){
        // CONSTANT
        const data = await getData();
        // const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
        const format = d3.format(",d")
        const size = 200
        const radius = size / 2
        const {selectedSubject} = this.state;

        function autosize(svg) {
            document.querySelector('.sunburst').appendChild(svg);
            const box = svg.getBBox();
            // document.body.removeChild(svg);
            svg.setAttribute("viewBox", `${box.x} ${box.y} ${box.width} ${box.height}`);
            return svg;
        }

        const partition = (() => data => d3.partition()
            .size([2 * Math.PI, radius])
            (d3.hierarchy(data)
               .sum(d => d.value)
               .sort((a, b) => b.value - a.value)))()

        const root = partition(data);

        const arc = (o) => {
            return d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            // .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
            // .padRadius(radius / 2)
            .innerRadius(o ? 100 : 150)
            .outerRadius(o ? 150 : 200)
        }


        const svg = d3.select('.sunburst').append('svg')
            .style("width", 600)
            .style("height", 600)
            // .style("padding", "10px")
            .style("font", "8px sans-serif")
            .style('transform', 'translate(25px, 25px)')
            .style('background', 'rgba(0, 0, 0, 0.1)')
            // .style("box-sizing", "border-box");


            svgPath()
            svgPath(true)

        function svgPath(o){
            svg.append("g")
            .attr("fill-opacity", .5)
            .selectAll("path")
            .data(root.descendants().filter(d => d.depth))
            .enter().append("path")
            .attr('stroke' , 'lightcoral')
            .attr('stroke-width', '0.5px')
            .attr('fill', 'grey' )
            // .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
            .attr('d', arc(o))
            // .attr("d", bloc === 'second' ? this.arc(radius , 'second') : this.arc(radius))
            .on('mouseover', function (d, i, nodes) {
                d3.select(nodes[i])
                .attr('fill', 'blue')
            })
            .on('mouseout', function (d, i, nodes) {
                d3.select(nodes[i])
                .attr('fill', 'grey')
            })

            .append("title")
            .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
            
            svg.append("g")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .selectAll("text")
                .data(root.descendants())
                .enter().append("text")
                .attr("transform", function(d) {
                    if(d.data.name === 'Hello World'){
                        return
                    }
                    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                    const y = o ? (100 + 150) / 2 : (150 + 200) / 2
                    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
                })
                .attr("dy", "0.35em")
                .text(d => d.data.name);
        }
        return autosize(svg.node());
    };

    render(){
        return(
            <div>
                {this.state.isLoading &&
                <h3>Loading ...</h3>
                }
                <div className="sunburst"></div>
                <Complete/>
            </div>
        )
    }
}

export default Sunburst;


// const params = {
//     one: {
//         innerRadius: 10,
//         outerRadius: 20,
//     },
//     two: {
//         innerRadius: 20,
//         outerRadius: 30
//     },
//     three: {
//         innerRadius: 30,
//         outerRadius: 40
//     }
// }

// renderData('one')
// renderData('two')
// renderData('three')

// renderData (number) {
//     arc
//     .innerRadius(d => params[number].innerRadius)
//     .outerRadius(d => params[number].outerRadius)
// }