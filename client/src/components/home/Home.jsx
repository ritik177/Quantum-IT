import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";

function Home() {
  const userTableData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Main St, City",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      address: "456 Elm St, Town",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      address: "789 Oak St, Village",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice.brown@example.com",
      address: "101 Pine St, County",
    },
    {
      id: 5,
      name: "Ella Davis",
      email: "ella.davis@example.com",
      address: "222 Birch St, Country",
    },
  ];

  const history = useNavigate();
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const displayName =
    userData && userData.name ? userData.name.toUpperCase() : "NAME NOT FOUND";

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      history("/login");
    }
  }, []);

  return (
    <div className="bg-white">
      <Navbar className="bg-body-tertiary ">
        <Container>
          <Navbar.Brand href="#home">React-Node-Test</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <span style={{ fontWeight: "600" }}>{displayName}</span>
            <Card style={{ margin: "2px 15px" }}>
              <Card.Body className="p-2">
                <span style={{ fontWeight: "bold" }} onClick={logout}>
                  Logout
                </span>
              </Card.Body>
            </Card>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="vh-100">
        <h1 style={{ textAlign: "center", marginTop: "35px" }}>
          Welcome to React Node Test!
        </h1>
        <br />
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {userTableData.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Home;
