import 'dart:ffi';

import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../widgets/login_widgets/login_SqareTile_widdget.dart';
import 'register_screen.dart';
import 'package:mobile/widgets/login_widgets/login_widgets.dart';
import 'package:mobile/widgets/login_widgets/login_button_widgets.dart';
import 'package:mobile/screens/users_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final AuthService _authService = AuthService();
  final TextEditingController _identifierController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  bool _isLoggingIn = false;
  bool _isObscure = true;

  void _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      setState(() {
        _isLoggingIn = true;
      });
      try {
        Map<String, dynamic> credentials;
        if (_identifierController.text.contains('@')) {
          credentials = {
            'email': _identifierController.text,
            'password': _passwordController.text
          };
        } else {
          credentials = {
            'username': _identifierController.text,
            'password': _passwordController.text
          };
        }
        final loginResult = await AuthService.loginUser(credentials);

        if (loginResult.containsKey('token')) {
          Navigator.pushReplacement(
              context, MaterialPageRoute(builder: (context) => UsersScreen()));
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Invalid credentials')));
        }
      } catch (error) {
        ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(error.toString())));
      } finally {
        setState(() {
          _isLoggingIn = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Form(
                key: _formKey,
                autovalidateMode: AutovalidateMode.always, // Add this line
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.lock,
                      size: 100,
                    ),
                    const SizedBox(height: 25),
                    Text(
                      'Welcome To Djerba Explore App',
                      style: TextStyle(
                        color: Colors.grey[700],
                        fontSize: 22,
                      ),
                    ),
                    const SizedBox(height: 25),
                    MyTextField(
                      controller: _identifierController,
                      hintText: 'Nom d\'utilisateur ou email',
                      obscureText: false,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Veuillez entrer votre nom d\'utilisateur ou email';
                        }
                        return null;
                      },
                    ),
                   const SizedBox(height: 25),
                    Stack(
                      alignment: Alignment.centerRight,
                      children: [
                        MyTextField(
                          controller: _passwordController,
                          hintText: 'Mot de passe',
                          obscureText: _isObscure,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              return 'Veuillez entrer votre mot de passe';
                            }
                            return null;
                          },
                        ),
                        Positioned(
                          left: 300,
                          child: IconButton(
                            icon: Icon(
                              _isObscure ? Icons.visibility_off : Icons.visibility,
                              color: Colors.grey,
                            ),
                            onPressed: () {
                              setState(() {
                                _isObscure = !_isObscure;
                              });
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 25.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [
                          Text(
                            'Mot de passe oublié?',
                            style: TextStyle(color: Colors.grey[600]),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),
                    MyButton(
                      onTap: _isLoggingIn ? null : _submitForm,
                      label: _isLoggingIn ? 'Logging In...' : 'Login',
                    ),
                    const SizedBox(height: 20),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 25.0),
                      child: Row(
                        children: [
                          Expanded(
                            child: Divider(
                              thickness: 0.5,
                              color: Colors.grey[400],
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 10.0),
                            child: Text(
                              'Ou continuer avec',
                              style: TextStyle(color: Colors.grey[700]),
                            ),
                          ),
                          Expanded(
                            child: Divider(
                              thickness: 0.5,
                              color: Colors.grey[400],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 50),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        SquareTile(imagePath: 'images/google.png'),
                        SizedBox(width: 25),
                        SquareTile(imagePath: 'images/apple.png')
                      ],
                    ),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'vous n \'avez pas un compte?',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        const SizedBox(width: 4),
                        GestureDetector(
                          onTap: () {
                            Navigator.push(context, MaterialPageRoute(builder: (context) => RegisterScreen()));
                          },
                          child: Text(
                            'Register maintenant',
                            style: TextStyle(
                              color: Colors.blue,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
