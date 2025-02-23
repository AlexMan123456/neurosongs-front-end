import Loading from "../../Loading"

function SignUpSuccess({signedUpWith}){
    return (<section>
        <h2>Sign-up successful!</h2>
        <p><strong>Do not close or refresh this page!</strong></p>
        <p>Taking you back to {signedUpWith === "email" ? "sign-in page" : "homepage"}...</p>
        <Loading/>
    </section>)
}

export default SignUpSuccess