// Higher Order Component
import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
)
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Please do not share!</p>}
            <WrappedComponent {...props} />
        </div>
    )
}
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} /> 
            ) : (
                <p>You need to sign in shit head!</p>
            )}
        </div>
    )
}
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details" test= 'i test' />, document.getElementById('app'))
// ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details"/>, document.getElementById('app'))
