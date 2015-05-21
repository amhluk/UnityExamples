//Player Script

//Inspector Variables
var tagName 	: String;	//allow the designer to setup a tag in the inspector
var rayDistance : float = 0;//length of the ray for our raycast
var score		: int = 0;	//score for our player
var gameTime	: float = 20.0; //the amount of time the game will last	
var loadWaitTime: float = 3.0; //amount of time to wait before we load the next scene
var numberOfPointsToWin : int = 5; //number of points to win game
//Private Variables

//Start is only called once in the lifetime of the behaviour
function Start ()
{
	InvokeRepeating('CountDown', 1.0, 1.0); //Repeat the countdown every second
}

//Update is called every frame
function Update () {
	//use the mouse button to select on GO in the scene
	if ( Input.GetMouseButtonDown(0) )
	{
		var hit : RaycastHit;
		var ray: Ray = Camera.main.ScreenPointToRay(Input.mousePosition); //get mouse position
		// cast a ray against all colliders in the scene
		if (Physics.Raycast( ray, hit, rayDistance))
		{
			if (hit.transform.tag == tagName)
			{
				var enemyScript = hit.transform.GetComponent(scriptEnemy);
				enemyScript.numberOfClicks -= 1; // reduce the number each click 
				// check that the object is at 0 before adding the points to the school
				if (enemyScript.numberOfClicks == 0)
				{
					score += enemyScript.enemyPoint; //add points to our overall score
				}
			}
			else 
			{
				print("This is not an enemy!");
			}
		}
	}
}

//Countdown the gametime
function CountDown ()
{
	if (--gameTime == 0) // subtract the gametime
	{
		CancelInvoke("CountDown"); //cancel the countdown
		if (score >= numberOfPointsToWin)
		{
			Application.LoadLevel("sceneScreenWin");
		}
		else
		{
			Application.LoadLevel("sceneScreenLose");
		}
	}
}

function OnGUI ()
{
	GUI.Label(Rect(10,10,100,20),"Score: " + score);
	GUI.Label(Rect(10,25,100,35),"Time: " + gameTime);
}
