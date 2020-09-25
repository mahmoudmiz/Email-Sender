import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      threshold: "",
      showSuccessAlert: false,
      showFailAlert: false,
      msj: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch("/subscribe", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        this.setState({
          name: "",
          email: "",
          threshold: "",
          showSuccessAlert: false,
          showFailAlert: false,
          msj: "",
        });

        if (res.status === 201) {
          this.setState({ ...this.state, showSuccessAlert: true });
        } else {
          this.setState({ ...this.state, showFailAlert: true });
        }
        if (this.state.showSuccessAlert) {
          setTimeout(() => {
            this.setState({ ...this.state, showSuccessAlert: false });
          }, 8000);
        }

        if (this.state.showFailAlert) {
          setTimeout(() => {
            this.setState({ ...this.state, showFailAlert: false });
          }, 8000);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ ...this.state, msj: data.msj });
      });
  };

  render() {
    return (
      <>
        {this.state.showSuccessAlert ? (
          <Alert
            style={{
              top: "5rem",
              position: "relative",
              margin: "0 auto",
              width: "30%",
            }}
            severity="success"
          >
            {this.state.msj}
          </Alert>
        ) : null}
        {this.state.showFailAlert ? (
          <Alert
            style={{
              top: "5rem",
              position: "relative",
              margin: "0 auto",
              width: "30%",
            }}
            severity="error"
          >
            {this.state.msj}
          </Alert>
        ) : null}
        <div className="register">
          <h2>
            Subscribe to our mailing list and get notified everytime the gas
            prices is below a specific USD threshold!
          </h2>

          <form onSubmit={(e) => this.handleSubmit(e)} id="registerForm">
            <TextField
              style={{ marginBottom: "1rem" }}
              name="name"
              value={this.state.name}
              onChange={(e) => this.handleChange(e)}
              required
              label="Name"
              variant="outlined"
              size="medium"
            />

            <TextField
              style={{ marginBottom: "1rem" }}
              name="email"
              value={this.state.email}
              onChange={(e) => this.handleChange(e)}
              required
              label="Email"
              variant="outlined"
              type="email"
              size="medium"
            />

            <TextField
              style={{ marginBottom: "1rem" }}
              name="threshold"
              value={this.state.threshold}
              onChange={(e) => this.handleChange(e)}
              required
              label="USD Threshold"
              variant="outlined"
              size="medium"
            />

            <Button variant="contained" color="primary" type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </>
    );
  }
}
export default Register;
