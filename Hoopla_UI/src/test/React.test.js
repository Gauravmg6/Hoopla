import React from 'react';
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({adapter: new Adapter()});
import {shallow,mount} from "enzyme";
import {create} from "react-test-renderer";


import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/NavBar";
import Cart from "../components/cart";

import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';


describe("Snapshot",()=>{
    test("Register snapshot",()=>{
        const component=create(<Cart />);
        let tree=component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Home Component",()=>{
    test("existence",()=>{
        const wrapper=shallow(<Home />)
        expect(wrapper.exists()).toBe(true);
    });
    test("FormControl Length check",()=>{
        const wrapper=mount(<Home />)
        expect(wrapper.find(Carousel).length).toEqual(1);
    });
    test("FormControl Length check",()=>{
        const wrapper=mount(<Home />)
        expect(wrapper.find(Link).length).toEqual(4);
    });
});

describe("Login Component",()=>{
    test("existence",()=>{
        const wrapper=shallow(<Login />)
        expect(wrapper.exists()).toBe(true);
    });
    test("props Check",()=>{
        const wrapper=shallow(<Login />)
        expect(wrapper.props()).toBeTruthy();
    });
});

describe("register component",()=>{
    test("existence",()=>{
        const wrapper=shallow(<Register />)
        expect(wrapper.exists()).toBe(true);
    });
    test("props check",()=>{
        const wrapper=shallow(<Register />)
        expect(wrapper.props()).toBeTruthy();
    });
});

describe("Navbar component",()=>{
    test("existence",()=>{
        const wrapper=shallow(<Navbar />)
        expect(wrapper.exists()).toBe(true);
    });
});

