import Loading from "../../Loading"

function SignUpSuccess(){
    return (<section>
        <h2>Sign-up successful!</h2>
        <p><strong>Do not close or refresh this page!</strong></p>
        <p>Taking you back to sign-in page...</p>
        <Loading/>
    </section>)
}

export default SignUpSuccess