function greeter(person: string) {
	return "Hello, "  + person;
}

var user = "Hey";

document.body.innerHTML = greeter(user);