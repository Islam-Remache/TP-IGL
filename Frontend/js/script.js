var x = document.getElementById("login");
        var y = document.getElementById("signup");
        var z = document.getElementById("btn");
        var c = document.getElementById("connexion");
        var i = document.getElementById("inscrire");
        
        function register() {
            x.style.left = "-400px";
            y.style.left = "50px";
            z.style.left = "184px";
            z.style.right = "8px";
            c.style.opacity = ".6";
            i.style.opacity = "1";
        }
        function login() {
            x.style.left = "50px";
            y.style.left = "400px";
            z.style.left = "8px";
            i.style.opacity = ".6";
            c.style.opacity = "1";
        }