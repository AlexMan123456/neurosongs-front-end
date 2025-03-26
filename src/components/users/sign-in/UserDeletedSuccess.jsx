import Loading from "../../Loading"

function UserDeletedSuccess(){
    return (<section>
        <h2>Successfully deleted your account</h2>
        <p><strong>Do not close or refresh this page!</strong></p>
        <p>Taking you back to homepage...</p>
        <Loading/>
    </section>)
}

export default UserDeletedSuccess