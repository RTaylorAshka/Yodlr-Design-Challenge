const form = document.getElementById('signup-form')
const messages = document.getElementById('message-display')
// When form on signup page submitted, call handleSubmit function
form.addEventListener('submit', handleSubmit)

// Collecting form data and adding new user through API
async function signup() {
    let formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value
    }

    // Custom messages on submission success/fail
    const msgSuccess = () => {
        messages.innerHTML = `
        <div class="alert alert-success">
            <strong>Submission received!</strong> Your account status is now pending.
        </div>`
    }

    const msgFail = () => {
        messages.innerHTML = `
        <div class="alert alert-danger">
            <strong>Error!</strong> Something went wrong while trying to process your submission.
        </div> `
    }

    // Submitting form data to backend
    try {
        let res = await axios.post('http://localhost:3000/users', formData, { headers: { Accept: 'application/json', } })
        if ((res.status) == 200) {
            msgSuccess()
        } else {
            msgFail()
        }
    } catch {
        msgFail()
    }

}

// Prevent page reload, call signup function to submit form data
function handleSubmit(e) {
    e.preventDefault()
    signup()
}

