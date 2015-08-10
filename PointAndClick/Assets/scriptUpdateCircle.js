//Enemy Script

//Inspector Variables
var countDown		: int = 6;		//time in seconds before circle disappears
var radius          : float = 0.5;      //radius of movement of circle
var speed           : int = 2*Mathf.PI; //2*PI in degress is 360

//Private Variables
private var storeCountDown : int = 0;
private var storeRespawnWaitTime : int;
private var curAngle = 0;

//Start is only called once in the lifetime of the behaviour
function Start ()
{
	var enemyScript = GetComponent(scriptEnemy);
	storeCountDown = countDown;
	storeRespawnWaitTime = enemyScript.respawnWaitTime;
	InvokeRepeating('UpdateCircle', 0.5, 0.5); //Repeat the countdown every second
}

//Reset countdown
function ResetCountDown () 
{
	var enemyScript = transform.GetComponent(scriptEnemy);
	countDown = storeCountDown + 2*enemyScript.respawnWaitTime; //original countdown + extra respawn time
	curAngle = 0;
}

//Update the circle every second
function UpdateCircle ()
{
	var enemyScript = transform.GetComponent(scriptEnemy);
	if (--countDown == 0) // subtract the gametime
	{
		enemyScript.respawnWaitTime = Random.Range(1, storeRespawnWaitTime);
		enemyScript.Update();//update
	} else {
	    if (countDown % 2 == 0) { //do every 2 updates to circle
			enemyScript.RandomColor ();//flash by changing color
		}
		
		//move circle in a circle
		curAngle += speed*countDown; //if you want to switch direction, use -= instead of +=
    	var xCoordinate = transform.position.x + Mathf.Cos(curAngle)*radius;
    	var yCoordinate = transform.position.y + Mathf.Sin(curAngle)*radius;
		
		var newPosition = Vector3 ( xCoordinate, yCoordinate, 0 );
		transform.position = newPosition;
	}
}
