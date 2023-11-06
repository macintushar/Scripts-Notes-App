import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:scripts_notes_mobile/pages/accountPage.dart';
import 'package:scripts_notes_mobile/pages/login.dart';
import 'package:scripts_notes_mobile/pages/splashScreen.dart';


Future<void> main() async {
  await Supabase.initialize(
    url: 'https://ylatzuiixaozxysettqu.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsYXR6dWlpeGFvenh5c2V0dHF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5ODY5MzAsImV4cCI6MjAxMzU2MjkzMH0.5sRpQ-UEiL1AeDJENOC8ahcQck6WjlTAqwNVK51BarI',
  );
  runApp(const MyApp());
}

final supabase = Supabase.instance.client;

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Supabase Flutter',
      theme: ThemeData.dark().copyWith(
        primaryColor: Colors.green,
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: Colors.green,
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            foregroundColor: Colors.white,
            backgroundColor: Colors.green,
          ),
        ),
      ),
      initialRoute: '/',
      routes: <String, WidgetBuilder>{
        '/': (_) => const SplashPage(),
        '/login': (_) => const LoginPage(),
        '/account': (_) => const AccountPage(),
      },
    );
  }
}
