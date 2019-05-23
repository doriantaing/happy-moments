export const merged = async () => {
    const res = await fetch('http://localhost:5000/all')
    const { data: [ subjects, verbs, objects ] } = await res.json()

    const data = {
        name: 'merged',
        children: [],
        // value: 100000
    };

    subjects.forEach(({ subject, count }) => {
        data.children.push({ name: subject, value: count, children: [] })
    })
    let totalVerbs = 0
    verbs.filter(({ subject, verb, count }) => subject === 'i')
    .forEach(({ subject, verb, count }) => {
        totalVerbs += +count
        data.children.find(({ name }) => name === subject)
        .children.push({ name: verb, value: count, children: [] })
    })
    console.log(totalVerbs)
    objects.filter(({ subject, verb, object, count }) => subject === 'i' && verb === 'get')
    .forEach(({ subject, verb, object, count }) => {
        data.children.find(({ name }) => name === subject)
        .children.find(({ name }) => name === verb)
        .children.push({ name: object, value: 10000000, children: [] })
    })
    console.log('DATTA' , data)
    return data
}

export const objects = async (subject, verb) => {
    const res = await fetch(`http://localhost:5000/?subject=${subject}&verb=${verb}`)
    // const { data: [ subjects, verbs, objects ] } = await res.json()
    const objects = await res.json()
    // console.log(objects)
  
  
    const data = {
      name: '[2] ' + subject + ' ' + verb,
      children: [],
      // value: 100000
    }
  
    // subjects.forEach(({ subject, count }) => {
    //   data.children.push({ name: subject, value: count, children: [] })
    // })
    // verbs.forEach(({ subject, verb, count }) => {
    //   data//.children.find(({ name }) => name === subject)
    //    .children.push({ name: verb, value: count, children: [] })
    // })
    objects.forEach(({ subject, verb, object, count }) => {
      data//.children.find(({ name }) => name === subject)
       //.children.find(({ name }) => name === 'get')//verb)
       .children.push({ name: object, value: count, children: [] })
    })
    return data
  }
  
  export const subjects = async () => {
    const res = await fetch(`http://localhost:5000`)
    // const { data: [ subjects, verbs, objects ] } = await res.json()
    const subjects = await res.json()
    // console.log(subjects)
  
    const data = {
        name: 'Hello World',
        children: [],
        // value: 100000
    }
    
    subjects.forEach(({ subject, count }) => {
      if(!subject){
          subject = 'No subject';
      }
      data.children.push({ name: subject, value: count, children: [] })
    })
    // verbs.forEach(({ subject, verb, count }) => {
    //   data//.children.find(({ name }) => name === subject)
    //    .children.push({ name: verb, value: count, children: [] })
    // })
    // objects.forEach(({ subject, verb, object, count }) => {
    //   data//.children.find(({ name }) => name === subject)
    //    //.children.find(({ name }) => name === 'get')//verb)
    //    .children.push({ name: object, value: count, children: [] })
    // })
    return data
  }
  