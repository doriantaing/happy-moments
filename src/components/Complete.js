import React, { Component } from 'react';

class Complete extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          subject: "",
          verb: "",
          object: "",
          sentences: [],
          error: false
        }
    }

    async getDatas(event){
        event.preventDefault();
        if(this.state.object !== "" && this.state.verb !== "" && this.state.object !== ""){
            console.log(this.state)
            const res = await fetch(`http://localhost:5000/?subject=${this.state.subject}&verb=${this.state.verb}&object=${this.state.object}`)
            const data = await res.json();
            if(data.length === 0){
                this.setState({error: true})
            } else {
                this.setState({error: false})
                console.log(data)
                this.setState({
                    sentences: data[0].array_agg
                })
            } 
        }

    }

    subjectChange(event) {
        this.setState({subject: event.target.value});
    }
    objectChange(event) {
        this.setState({object: event.target.value});
    }
    verbChange(event) {
        this.setState({verb: event.target.value});
    }

    render() {
        const error = this.state.error;
        const {subject , verb , object} = this.props;
        {console.log(this.props)}
      return (
        <div className="complete">
            <form onSubmit={this.renderGraph} className="complete-form">
                <div className="complete-input">
                    <label>Subject</label>
                    <input type="text" onChange={this.subjectChange.bind(this)} value={subject}/>
                </div>
                <div className="complete-input">
                    <label>Verb</label>
                    <input type="text" onChange={this.verbChange.bind(this)} value={verb}/>
                </div>
                <div className="complete-input">
                    <label>Object</label>
                    <input type="text" onChange={this.objectChange.bind(this)} value={object}/>
                </div>
                {/* <input type="submit" value="Submit" /> */}
            </form>
            
            {error ? (

                <div>Il n'y a aucun élément</div>

            ) : (

                <ul className="list">
                    {this.state.sentences.map((value, index) => {
                        return <li key={index}>{value}</li>
                    })}
                </ul>
                
            )}

        </div>
      );
    }


  }
export default Complete;
