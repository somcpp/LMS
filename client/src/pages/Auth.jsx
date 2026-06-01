import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useState } from "react"

export function Auth() {

  // LOGIN STATE
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: ""
  });

  // SIGNUP STATE
  const [signupInput, setSignUpInput] = useState({
    name: "",
    email: "",
    password: ""
  });

  // HANDLE INPUT CHANGE
  const handleChange = (e, type) => {
    const { name, value } = e.target;

    if (type === "signUp") {
      setSignUpInput({
        ...signupInput,
        [name]: value
      });
    } else {
      setLoginInput({
        ...loginInput,
        [name]: value
      });
    }
  };

  // HANDLE FORM SUBMIT
  const handleRegistration = (e, type) => {
    e.preventDefault();

    if (type === "signUp") {
      console.log("Signup Data:", signupInput);
    } else {
      console.log("Login Data:", loginInput);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Tabs defaultValue="signup" className="w-[400px]">

        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        {/* SIGNUP */}
        <TabsContent value="signup">
          <Card>

            <CardHeader>
              <CardTitle>Create Account</CardTitle>

              <CardDescription>
                Enter your details to create a new account.
              </CardDescription>
            </CardHeader>

            <CardContent>

              <form
                className="space-y-4"
                onSubmit={(e) => handleRegistration(e, "signUp")}
              >

                {/* NAME */}
                <div>
                  <Label htmlFor="name">Full Name</Label>

                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={signupInput.name}
                    placeholder="enter name"
                    onChange={(e) => handleChange(e, "signUp")}
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <Label htmlFor="signup-email">Email</Label>

                  <Input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={signupInput.email}
                    placeholder="enter email..."
                    onChange={(e) => handleChange(e, "signUp")}
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <Label htmlFor="signup-password">Password</Label>

                  <Input
                    id="signup-password"
                    type="password"
                    name="password"
                    value={signupInput.password}
                    placeholder="********"
                    onChange={(e) => handleChange(e, "signUp")}
                  />
                </div>

                <Button className="w-full" type="submit">
                  Create Account
                </Button>

              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOGIN */}
        <TabsContent value="login">
          <Card>

            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>

              <CardDescription>
                Login to your account.
              </CardDescription>
            </CardHeader>

            <CardContent>

              <form
                className="space-y-4"
                onSubmit={(e) => handleRegistration(e, "login")}
              >

                {/* EMAIL */}
                <div>
                  <Label htmlFor="login-email">Email</Label>

                  <Input
                    id="login-email"
                    type="email"
                    name="email"
                    value={loginInput.email}
                    placeholder="enter email..."
                    onChange={(e) => handleChange(e, "login")}
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <Label htmlFor="login-password">Password</Label>

                  <Input
                    id="login-password"
                    type="password"
                    name="password"
                    value={loginInput.password}
                    placeholder="********"
                    onChange={(e) => handleChange(e, "login")}
                  />
                </div>

                <Button className="w-full" type="submit">
                  Login
                </Button>

              </form>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}