import 'package:flutter/material.dart';
import 'package:scripts_notes_mobile/main.dart';

class AccountPage extends StatefulWidget {
  const AccountPage({super.key});

  @override
  _AccountPageState createState() => _AccountPageState();
}

class _AccountPageState extends State<AccountPage> {
  final _usernameController = TextEditingController();
  final _websiteController = TextEditingController();
  var _loading = true;

  // A list to store the data retrieved from Supabase.
  List<Map<String, dynamic>> notesData = [];

  // Function to fetch user data from Supabase.
  Future<void> _getProfile() async {
    setState(() {
      _loading = true;
    });

    try {
      final userId = supabase.auth.currentUser?.id;
      if (userId != null) {
        final response = await supabase
            .from('notes')
            .select<List<dynamic>>()
            .eq('user_id', userId);
        print(response);

          notesData = (response)
              .map((dynamic item) => item as Map<String, dynamic>)
              .toList();
      }
    } catch (error) {
      print("Unexpected Error: $error");
    } finally {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    }
  }

  Future<void> _signOut() async {
    try {
      await supabase.auth.signOut();
      Navigator.of(context).pushReplacementNamed('/login');
    } catch (error) {
      // Handle errors here.
    }
  }

  @override
  void initState() {
    super.initState();
    _getProfile();
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _websiteController.dispose();
    super.dispose();
  }

  String truncateString(String input, int maxLength) {
    if (input.length <= maxLength) {
      return input;
    } else {
      return input.substring(0, maxLength);
    }
  }

@override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : ListView(
              padding: const EdgeInsets.symmetric(vertical: 18, horizontal: 12),
              children: [
                const SizedBox(height: 18),
                TextButton(onPressed: _signOut, child: const Text('Sign Out')),
                // Generate cards based on the data retrieved from Supabase.
                for (var note in notesData)
                  Card(
                    child: ListTile(
                      title: Text(note["note_title"]),
                      subtitle: Text(truncateString(note["note_body"], 50)),
                    ),
                  ),
              ],
            ),
    );
  }

}
