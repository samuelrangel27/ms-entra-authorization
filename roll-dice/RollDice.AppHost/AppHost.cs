using Projects;

var builder = DistributedApplication.CreateBuilder(args);
var api = builder.AddProject<RollDice_Api>("api")
    .WithHttpHealthCheck("/health");

var frontend = builder.AddViteApp("frontend", "../roll-dice-ui")
    .WithReference(api) // Establishes a dependency on the API
    .WaitFor(api);      // Ensures API starts before the frontend
builder.Build().Run();
