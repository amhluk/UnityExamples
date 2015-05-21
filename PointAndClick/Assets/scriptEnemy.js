//Enemy Script

//Inspector Variables
var shapeColor		: Color[];		//color of the object
var numberOfClicks 	: int = 2;		//how many times to click on an object before it gets destroyed
var respawnWaitTime : float = 2.0;	//how long to hide
var explosion		: Transform;	//load particle effect
var enemyPoint		: int = 1;		//value of the enemy object

//Private Variables
private var storeClicks : int = 0;

//Start is only called once in the lifetime of the behaviour
function Start ()
{
	storeClicks = numberOfClicks;
	var startPosition = Vector3 ( Random.Range(-6,6), Random.Range(-4,4), 0 ); //new random position for the game object
	transform.position = startPosition; //move the game object to the new location
	RandomColor();
}

//Update is called every frame
function Update () 
{
	var enemyScriptCircle = transform.GetComponent(scriptUpdateCircle);
	if (numberOfClicks <= 0 || (enemyScriptCircle && enemyScriptCircle.countDown <= 0))
	{
		if (explosion) 
		{
			Instantiate (explosion, transform.position, transform.rotation); //create an explosion
		}
		if (audio && audio.clip)
		{
			audio.Play();
		}
		var position = Vector3 ( Random.Range(-6,6), Random.Range(-4,4), 0 ); //new random position for the game object
		
		RespawnWaitTime ();
		transform.position = position; //move the game object to the new location
		numberOfClicks = storeClicks;
		
		//reset countdown if it is a circle
		if (enemyScriptCircle) {
			enemyScriptCircle.ResetCountDown ();
		}
	}
}
//RespawnWaitTime is used to hide a game object for a set amount of time and then unhide it
function RespawnWaitTime ()
{	
	renderer.enabled = false;
	RandomColor ();
	yield WaitForSeconds(respawnWaitTime);
	renderer.enabled = true;
}
//RandomColor is used change out the material of a game object
function RandomColor ()
{
	if (shapeColor.length > 0)
	{
		var newColor = Random.Range(0,shapeColor.length);
		renderer.material.color = shapeColor[newColor];
	}
}