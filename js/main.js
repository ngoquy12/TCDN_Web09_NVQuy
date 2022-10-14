

    let url='https://amis.manhnv.net/api/v1/Employees';
    fetch(url).then(function(response){
        return response.json();
    }).then(function(employees){
        let htmls=employees.map(function(employee){
            console.log(employee);
        })
    })
    .catch(function(err){
        console.log(err);
    })