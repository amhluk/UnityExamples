//Enemy Script

//Inspector Variables
var countDown		: int = 3;		//time in seconds before circle disappears

//Private Variables
private var storeCountDown : int = 0;
private var storeRespawnWaitTime : int;

//Start is only called once in the lifetime of the behaviour
function Start ()
{
	var enemyScript = GetComponent(scriptEnemy);
	storeCountDown = countDown;
	storeRespawnWaitTime = enemyScript.respawnWaitTime;
	InvokeRepeating('UpdateCircle', 1.0, 1.0); //Repeat the countdown every second
}

//Update is called every frame
function ResetCountDown () 
{
	var enemyScript = transform.GetComponent(scriptEnemy);
	countDown = storeCountDown + enemyScript.respawnWaitTime; //original countdown + extra respawn time
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
		enemyScript.RandomColor ();//flash by changing color
	}
}
