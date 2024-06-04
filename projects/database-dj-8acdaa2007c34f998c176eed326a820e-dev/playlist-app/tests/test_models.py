import pytest
from app import app
from models import Playlist, Song, PlaylistSong, db


@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.test_client() as client:
        with app.app_context():
            db.create_all()

        yield client

        with app.app_context():
            db.session.remove()
            db.close_all_sessions()
            db.drop_all()


class TestModels:
    class TestPlaylist:
        def test_playlist_model_has_name_and_description(self, client):
            with app.test_request_context():
                playlist = Playlist(name="Test Playlist",
                                description="Test Description")
                db.session.add(playlist)
                db.session.commit()

                fetched_playlist = Playlist.query.get(playlist.id)
                assert fetched_playlist.name == "Test Playlist"
                assert fetched_playlist.description == "Test Description"

        def test_playlist_model_name_is_not_nullable(self, client):
            with app.test_request_context():
                with pytest.raises(Exception):
                    playlist = Playlist(name=None, description="Test Description")
                    db.session.add(playlist)
                    db.session.commit()
            
            with app.test_request_context():
                with pytest.raises(Exception):
                    playlist = Playlist(name=None, description="Test Description")
                    db.session.add(playlist)
                    db.session.commit()

        def test_playlist_model_description_is_nullable(self, client):
            with app.test_request_context():
                playlist = Playlist(name="Test Playlist", description=None)
                db.session.add(playlist)
                db.session.commit()

                fetched_playlist = Playlist.query.get(playlist.id)
                assert fetched_playlist.name == "Test Playlist"
                assert fetched_playlist.description is None

                playlist = Playlist(name="Test Playlist", description="")
                db.session.add(playlist)
                db.session.commit()

                fetched_playlist = Playlist.query.get(playlist.id)
                assert fetched_playlist.name == "Test Playlist"
                assert fetched_playlist.description == ""

        def test_playlist_model_id_autoincrements(self, client):
            with app.test_request_context():
                playlist1 = Playlist(name="Test Playlist 1",
                                    description="Test Description 1")
                db.session.add(playlist1)
                db.session.commit()

                playlist2 = Playlist(name="Test Playlist 2",
                                    description="Test Description 2")
                db.session.add(playlist2)
                db.session.commit()

                fetched_playlist1 = Playlist.query.get(playlist1.id)
                fetched_playlist2 = Playlist.query.get(playlist2.id)
                assert fetched_playlist1.id < fetched_playlist2.id

        def test_playlist_model_has_only_expected_columns(self, client):
            with app.test_request_context():
                columns = set(column.name for column in Playlist.__table__.columns)

                expected_columns = {'id', 'name', 'description'}
                assert columns == expected_columns, f"Unexpected columns found: {', '.join(columns - expected_columns)}"

    class TestSong:
        def test_song_model_has_title_and_author(self, client):
            with app.test_request_context():
                song = Song(title="Test Song", author="Test Author")
                db.session.add(song)
                db.session.commit()

                fetched_song = Song.query.get(song.id)
                assert fetched_song.title == "Test Song"
                assert fetched_song.author == "Test Author"

        def test_song_model_title_is_not_nullable(self, client):
            with app.test_request_context():            
                with pytest.raises(Exception):
                    song = Song(title=None, author="Test Author")
                    db.session.add(song)
                    db.session.commit()
            

        def test_song_model_author_is_not_nullable(self, client):
            with app.test_request_context():            
                with pytest.raises(Exception):
                    song = Song(title="Test Title", author=None)
                    db.session.add(song)
                    db.session.commit()
            
                with pytest.raises(Exception):
                    song = Song(title="Test Title", author="")
                    db.session.add(song)
                    db.session.commit()

        def test_song_model_id_autoincrements(self, client):
            with app.test_request_context():
                song1 = Song(title="Test Song 1", author="Test Author 1")
                db.session.add(song1)
                db.session.commit()

                song2 = Song(title="Test Song 2", author="Test Author 2")
                db.session.add(song2)
                db.session.commit()

                fetched_song1 = Song.query.get(song1.id)
                fetched_song2 = Song.query.get(song2.id)
                assert fetched_song1.id < fetched_song2.id

        def test_song_model_has_only_expected_columns(self, client):
            with app.test_request_context():
                columns = set(column.name for column in Song.__table__.columns)

                expected_columns = {'id', 'title', 'author'}
                assert columns == expected_columns, f"Unexpected columns found: {', '.join(columns - expected_columns)}"

    class TestPlaylistSong:
        def test_playlist_song_model_creates_relationships(self, client):
            with app.test_request_context():
                playlist = Playlist(name="Test Playlist",
                                    description="Test Description")
                song = Song(title="Test Song", author="Test Author")
                db.session.add(playlist)
                db.session.add(song)
                db.session.commit()

                playlist_song = PlaylistSong(playlist_id=playlist.id, song_id=song.id)
                db.session.add(playlist_song)
                db.session.commit()

                fetched_playlist_song = PlaylistSong.query.get(playlist_song.id)
                assert fetched_playlist_song.playlist_id == playlist.id
                assert fetched_playlist_song.song_id == song.id

                # Test relationship
                assert Playlist.query.get(fetched_playlist_song.playlist_id) == playlist
                assert Song.query.get(fetched_playlist_song.song_id) == song

        def test_playlist_song_model_id_autoincrements(self, client):
            with app.test_request_context():
                playlist1 = Playlist(name="Test Playlist 1",
                                    description="Test Description 1")
                playlist2 = Playlist(name="Test Playlist 2",
                                    description="Test Description 2")
                song1 = Song(title="Test Song 1", author="Test Author 1")
                song2 = Song(title="Test Song 2", author="Test Author 2")

                db.session.add_all([playlist1, playlist2, song1, song2])
                db.session.commit()

                playlist_song1 = PlaylistSong(
                    playlist_id=playlist1.id, song_id=song1.id)
                playlist_song2 = PlaylistSong(
                    playlist_id=playlist2.id, song_id=song2.id)

                db.session.add_all([playlist_song1, playlist_song2])
                db.session.commit()

                fetched_playlist_song1 = PlaylistSong.query.get(playlist_song1.id)
                fetched_playlist_song2 = PlaylistSong.query.get(playlist_song2.id)

                assert fetched_playlist_song1.id < fetched_playlist_song2.id

        def test_playlist_song_model_playlist_id_is_not_nullable(self, client):
            with app.test_request_context():
                playlist = Playlist(name="Test Playlist",
                                    description="Test Description")
                song = Song(title="Test Song", author="Test Author")

                db.session.add_all([playlist, song])
                db.session.commit()
            
                with pytest.raises(Exception):
                    playlist_song = PlaylistSong(playlist_id=None, song_id=song.id)
                    db.session.add(playlist_song)
                    db.session.commit()

        def test_playlist_song_model_song_id_is_not_nullable(self, client):
            with app.test_request_context():
                playlist = Playlist(name="Test Playlist",
                                    description="Test Description")
                song = Song(title="Test Song", author="Test Author")

                db.session.add_all([playlist, song])
                db.session.commit()
           
                with pytest.raises(Exception):
                    playlist_song = PlaylistSong(
                        playlist_id=playlist.id, song_id=None)
                    db.session.add(playlist_song)
                    db.session.commit()

        def test_playlist_song_model_playlist_id_points_to_valid_playlist(self, client):
            with app.test_request_context():
                playlist = Playlist(name="Test Playlist",
                                    description="Test Description")
                song = Song(title="Test Song", author="Test Author")

                db.session.add_all([playlist, song])
                db.session.commit()

                playlist_song = PlaylistSong(
                    playlist_id=playlist.id, song_id=song.id)
                db.session.add(playlist_song)
                db.session.commit()

                fetched_playlist_song = PlaylistSong.query.get(playlist_song.id)

                # Ensure it points to a valid playlist
                assert fetched_playlist_song.id == playlist.id

        def test_playlist_song_model_song_id_points_to_valid_song(self, client):
            with app.test_request_context():
                playlist = Playlist(name="Test Playlist",
                                    description="Test Description")
                song = Song(title="Test Song", author="Test Author")

                db.session.add_all([playlist, song])
                db.session.commit()

                playlist_song = PlaylistSong(
                    playlist_id=playlist.id, song_id=song.id)
                db.session.add(playlist_song)
                db.session.commit()

                fetched_playlist_song = PlaylistSong.query.get(playlist_song.id)

                # Ensure it points to a valid song
                assert fetched_playlist_song.id == song.id
