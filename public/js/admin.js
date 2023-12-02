// Requests user data from api, returns data of response.

async function getUsers() {
    try {
        console.log('here')
        let res = await axios.get('http://localhost:3000/users', { headers: { Accept: 'application/json', } })
        console.log(res)
        //Call function to populate page with results
        if (res.data) createTable(res.data)
        else throw new Error()

    } catch (e) {
        // If error, call create table with data set to null
        console.log(e)
        createTable()
    }




}

// Populating results in webpage
function createTable(data = null) {
    //Template for users in table
    const rowTemplate = (user) => {
        return (
            `<tr>
                <td>${user.id || 'n/a'}</td>
                <td>${(user.firstName + '' + user.lastName) || 'n/a'}</td>
                <td>${user.email || 'n/a'}</td>
                <td>${user.state == 'active' ?
                '<span class="badge bg-success">active</span>'
                : '<span class="badge bg-secondary">pending</span>'}</td>

            </tr>`
        )
    }
    const table = document.getElementById('user-table')
    let html = ''

    if (!data || (Object.values(data).length == 0)) {
        // If no data, populates table with a 'not found' message
        html += '<tr class="table-warning">User data not found.</tr>'

    }
    else {
        data.forEach(user => {
            html += rowTemplate(user)
        });

    }

    setTimeout(() => { table.innerHTML = html }, 2000)
}

getUsers()



