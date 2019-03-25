import React from 'react'
import { Form, TextArea, TextBox } from 'react-form-elements'
const ContactForm = () => {

  return (
    <main>
      <section>
        <h2>Contact</h2>
        <div>
          <Form
            onSubmit={values => {
              console.log('Name', values.userName)
              console.log('Email', values.userEmail)
              console.log('Message', values.message)
            }}
          >
            <TextBox
              name="userName"
              label="Your Name"
              initialValue=""
            />
            <TextBox
              type="email"
              name="userEmail"
              label="Your Email"
              initialValue=""
            />
            <TextArea label="Your Message" name="message" />

            <button>Send</button>
          </Form>
        </div>
      </section>
    </main>
  )
}

export default ContactForm
