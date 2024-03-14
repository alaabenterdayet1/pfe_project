import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/widgets/login_widgets/login_SqareTile_widdget.dart';
import 'package:mobile/widgets/signup_widgets/signup_button_widgets.dart';
import '../widgets/signup_widgets/signup_widgets.dart';
import 'login_screen.dart'; // Importer la page de connexion
import '../services/auth_service.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final AuthService _authService = AuthService();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _rePasswordController = TextEditingController();
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  bool _isRegistered = false;
  bool _isObscurePassword = true;
  bool _isObscureRePassword = true;

  Future<void> _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      try {
        await AuthService.registerUser({
          'username': _usernameController.text,
          'password': _passwordController.text,
          'repassword': _rePasswordController.text,
          'email': _emailController.text,
        });
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Inscription réussie!')));
        _resetFormFields();
      } catch (error) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(error.toString())));
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Veuillez remplir tous les champs')));
    }
  }

  void _resetFormFields() {
    _formKey.currentState!.reset();
    _passwordController.clear();
    _rePasswordController.clear();
    _usernameController.clear();
    _emailController.clear();
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
                autovalidateMode: AutovalidateMode.always,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.person,
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
                      controller: _usernameController,
                      hintText: 'Nom d\'utilisateur',
                      obscureText: false,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          //affchier un message pas return
                          return 'Veuillez entrer votre nom d\'utilisateur';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 25),
                    MyTextField(
                      controller: _emailController,
                      hintText: 'Email',
                      obscureText: false,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Veuillez entrer votre adresse email';
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
                          obscureText: _isObscurePassword,
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
                              _isObscurePassword ? Icons.visibility_off : Icons.visibility,
                              color: Colors.grey,
                            ),
                            onPressed: () {
                              setState(() {
                                _isObscurePassword = !_isObscurePassword;
                              });
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 25),
                    Stack(
                      alignment: Alignment.centerRight,
                      children: [
                        MyTextField(
                          controller: _rePasswordController,
                          hintText: 'Mot de passe',
                          obscureText: _isObscureRePassword,
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
                              _isObscureRePassword ? Icons.visibility_off : Icons.visibility,
                              color: Colors.grey,
                            ),
                            onPressed: () {
                              setState(() {
                                _isObscureRePassword = !_isObscureRePassword;
                              });
                            },
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    MyButton(
                      onTap: _submitForm,
                      label: 'S\'inscrire',
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
                          'vous avez déja un compte?',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        const SizedBox(width: 4),
                        GestureDetector(
                          onTap: () {
                            Navigator.push(context, MaterialPageRoute(builder: (context) => LoginScreen()));
                          },
                          child: Text(
                            'Connectez-vous ici',
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
