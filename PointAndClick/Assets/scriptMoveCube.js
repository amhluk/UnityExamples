//Move Cube Script

//Private Variables
private var translateX : int = 0; //move cube horizontally by this amount
private var translateY : int = 0; //move cube veritically by this amount

//Start is only called once in the lifetime of the behaviour
function Start ()
{
	InvokeRepeating('MoveCube', 0.5, 0.5); //Repeat the countdown every half second
}
//
function MoveCube ()
{
	var xCoordinate = transform.position.x;
	var yCoordinate = transform.position.y;
	
	//randomly set direction to move
	translateX = Random.Range(-1 ,1);
	translateY = Random.Range(-1, 1);
	
	//edge cases when trying to move at edge of screen
	if (xCoordinate == 6 && translateX == 1) {
		translateX = -1;
	} else if (xCoordinate == -6 && translateX == -1) {
		translateX = 1;
	}
	if (yCoordinate == 4 && translateY == 1) {
		translateY = -1;
	} else if (yCoordinate == -4 && translateY == -1) {
		translateY = 1;
	} 
	
	var newPosition = Vector3 ( xCoordinate + translateX, yCoordinate + translateY, 0 );
	transform.position = newPosition;
}