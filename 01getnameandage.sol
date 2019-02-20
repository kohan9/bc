pragma solidity ^0.4.22;

contract getAgeName {
    string nameVar;
    uint ageVar;
    
    event logsetname(
        address _from,
        string nameVar
    );
    event logsetage(
        address _from,
        uint ageVar
    );

    function setName(string newName) public {
        nameVar = newName;
        logsetname(msg.sender, newName);
    }

    function getName()  public constant returns (string)  {
        return nameVar;
    }

    function setAge(uint newAge) public{
        ageVar = newAge;
        logsetage(msg.sender, newAge);
    }

    function getAge()  public constant returns (uint) {
        return ageVar;
    }
}
