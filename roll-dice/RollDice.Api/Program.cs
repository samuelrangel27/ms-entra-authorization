var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowReactApp");

// Roll dice endpoint
app.MapGet("/roll-dice", (int numberOfDice) =>
{
    if (numberOfDice < 1 || numberOfDice > 100)
    {
        return Results.BadRequest(new { error = "Number of dice must be between 1 and 100" });
    }

    var random = new Random();
    var diceValues = new int[numberOfDice];
    
    for (int i = 0; i < numberOfDice; i++)
    {
        diceValues[i] = random.Next(1, 7); // Random number between 1 and 6
    }

    return Results.Ok(diceValues);
}).RequireCors("AllowReactApp");

app.Run();
