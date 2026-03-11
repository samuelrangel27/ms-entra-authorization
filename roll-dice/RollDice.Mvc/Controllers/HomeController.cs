using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RollDice.Mvc.Models;

namespace RollDice.Mvc.Controllers;

[Authorize]
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [HttpGet("/roll-dice")]
    public IActionResult RollDice([FromQuery] int numberOfDice)
    {
        if (numberOfDice < 1 || numberOfDice > 100)
        {
            return BadRequest(new { error = "Number of dice must be between 1 and 100" });
        }

        var random = new Random();
        var diceValues = new int[numberOfDice];
        
        for (int i = 0; i < numberOfDice; i++)
        {
            diceValues[i] = random.Next(1, 7); // Random number between 1 and 6
        }

        return Ok(diceValues);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [AllowAnonymous]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
