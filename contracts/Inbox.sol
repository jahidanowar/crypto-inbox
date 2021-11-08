pragma solidity ^0.4.17;

// linter warnings (red underline) about pragma version can igonored!

// contract code will go here
contract Inbox {
    string public message;

    function Inbox(string _message) public {
        message = _message;
    }

    function setMessage(string _message) public {
        message = _message;
    }

    function getMessage() public view returns (string) {
        return message;
    }
}
