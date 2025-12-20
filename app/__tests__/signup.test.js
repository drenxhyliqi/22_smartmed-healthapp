import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Signup from "../signup";


jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({
      user: { uid: "test-uid" },
    })
  ),
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../firebase", () => ({
  auth: {},
  db: {},
}));

jest.mock("expo-router", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  Link: ({ children }) => children,
}));

// Testet

describe("Signup Screen", () => {

  test("renders Sign Up screen", () => {
    const { getByTestId } = render(<Signup />);
    expect(getByTestId("signup-button")).toBeTruthy();
  });

  test("shows error when name is empty", async () => {
    const { getByTestId, getByText } = render(<Signup />);
    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(getByText("Name field is required.")).toBeTruthy();
    });
  });

  test("shows error for invalid email", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("Enter your name"), "Test User");
    fireEvent.changeText(getByPlaceholderText("Enter your email"), "invalid-email");
    fireEvent.changeText(getByPlaceholderText("Enter your password"), "123456");

    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(getByText("Please enter a valid email.")).toBeTruthy();
    });
  });

  test("shows error if password is too short", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("Enter your name"), "Test User");
    fireEvent.changeText(getByPlaceholderText("Enter your email"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("Enter your password"), "123");

    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(getByText("Password must be at least 6 characters.")).toBeTruthy();
    });
  });

  test("shows error if terms are not accepted", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("Enter your name"), "Test User");
    fireEvent.changeText(getByPlaceholderText("Enter your email"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("Enter your password"), "123456");

    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(getByText("You must agree to Terms & Privacy.")).toBeTruthy();
    });
  });

  test("creates user successfully when form is valid", async () => {
    const { getByPlaceholderText, getByTestId } = render(<Signup />);
    fireEvent.changeText(getByPlaceholderText("Enter your name"), "Test User");
    fireEvent.changeText(getByPlaceholderText("Enter your email"), "test@test.com");
    fireEvent.changeText(getByPlaceholderText("Enter your password"), "123456");

    fireEvent.press(getByTestId("terms-checkbox"));
    fireEvent.press(getByTestId("signup-button"));

    await waitFor(() => {
      expect(require("firebase/auth").createUserWithEmailAndPassword).toHaveBeenCalled();
    });
  });
});
