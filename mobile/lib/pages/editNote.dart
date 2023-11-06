import 'package:flutter/material.dart';
import 'package:scripts_notes_mobile/main.dart';

class EditNotePage extends StatefulWidget {
  final int noteId; // Add noteId as an argument

  const EditNotePage({super.key, required this.noteId});

  @override
  _EditNotePageState createState() => _EditNotePageState();
}

class _EditNotePageState extends State<EditNotePage> {
  final _titleController = TextEditingController();
  final _bodyController = TextEditingController();
  var _loading = true;

  Future<void> _getNotes() async {
    setState(() {
      _loading = true;
    });

    try {
      final userId = supabase.auth.currentUser?.id;
      if (userId != null) {
        final response = await supabase
            .from('notes')
            .select<List<dynamic>>('note_id, note_body')
            .eq('user_id', userId)
            .eq('note_id', noteId);
        print(response);

        _titleController.text = response[0]["note_title"];
        _bodyController.text = response[0]["note_body"];

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

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _bodyController.dispose();
    super.dispose();
  }

  void _updateNote() {
    // Implement the code to update the note on Supabase here.
    // You can use supabase client and update the note data.
    // After updating, you can navigate back to the previous page.
    // For example:
    // supabase.from('notes').upsert([{
    //   'id': widget.noteData['id'],
    //   'note_title': _titleController.text,
    //   'note_body': _bodyController.text,
    // }]);
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Edit Note"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextFormField(
              controller: _titleController,
              decoration: const InputDecoration(labelText: 'Title'),
            ),
            const SizedBox(height: 16),
            TextFormField(
              controller: _bodyController,
              decoration: const InputDecoration(labelText: 'Note Body'),
              maxLines: null, // Allow multiple lines
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: _updateNote,
              child: const Text('Update Note'),
            ),
          ],
        ),
      ),
    );
  }
}
