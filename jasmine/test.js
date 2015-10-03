
describe("A suite of basic function",function(){
	var name;

	it("sayHello",function(){
		name = "Nooooob";
		var exp = "Hello Nooooob";
		expect(exp).toEqual(sayHello(name));
	})
	it("reverse word",function(){
	expect("DCBA").toEqual(reverse("ABCD"));
	 expect("noooob").toEqual(reverse("boooon"));
    });
})

