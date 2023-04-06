import React from "react";
import ReactDOM from "react-dom";
import "rsuite/dist/rsuite.css";
import { Sidenav, Nav } from "rsuite";
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import styled from "styled-components";

const Sidebar = () => (
  <Wrapper style={{ width: 200 }}>
    <Sidenav defaultOpenKeys={["3", "4"]}>
      <Sidenav.Body>
        <Nav activeKey="1">
          <Nav.Menu eventKey="3" title="Advanced" icon={<DashboardIcon />}>
            <Nav.Item eventKey="3-1">Geo</Nav.Item>
            <Nav.Item eventKey="3-2">Devices</Nav.Item>
            <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
            <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
          </Nav.Menu>
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  </Wrapper>
);

const Wrapper=styled.div`
position: fixed;
top:80px;
left:30px;
`;
export default Sidebar;
