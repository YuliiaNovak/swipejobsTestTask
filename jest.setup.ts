import React from "react";

const mockIcon = () => () => React.createElement(React.Fragment);

jest.mock("@expo/vector-icons/Entypo", () => mockIcon());
jest.mock("@expo/vector-icons/AntDesign", () => mockIcon());
jest.mock("@expo/vector-icons/Ionicons", () => mockIcon());
