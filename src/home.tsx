import { Component, For, createSignal } from 'solid-js';
import styles from './Home.module.css';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface Song {
  id: number;
  artist: string;
  song: string;
  album: string;
  year: number;
}

interface HomeProps {
  user: User;
  onLogout: () => void;
}

const Home: Component<HomeProps> = (props) => {
  const [searchTerm, setSearchTerm] = createSignal('');
  const [selectedYear, setSelectedYear] = createSignal('all');

  const britpopSongs: Song[] = [
    { id: 1, artist: 'Oasis', song: 'Wonderwall', album: '(What\'s the Story) Morning Glory?', year: 1995 },
    { id: 2, artist: 'Blur', song: 'Song 2', album: 'Blur', year: 1997 },
    { id: 3, artist: 'Pulp', song: 'Common People', album: 'Different Class', year: 1995 },
    { id: 4, artist: 'Radiohead', song: 'Creep', album: 'Pablo Honey', year: 1992 },
    { id: 5, artist: 'Stone Roses', song: 'I Wanna Be Adored', album: 'The Stone Roses', year: 1989 },
    { id: 6, artist: 'Oasis', song: 'Don\'t Look Back in Anger', album: '(What\'s the Story) Morning Glory?', year: 1995 },
    { id: 7, artist: 'Blur', song: 'Girls & Boys', album: 'Parklife', year: 1994 },
    { id: 8, artist: 'Suede', song: 'Beautiful Ones', album: 'Coming Up', year: 1996 },
    { id: 9, artist: 'Elastica', song: 'Connection', album: 'Elastica', year: 1994 },
    { id: 10, artist: 'Supergrass', song: 'Alright', album: 'I Should Coco', year: 1995 },
    { id: 11, artist: 'Verve', song: 'Bitter Sweet Symphony', album: 'Urban Hymns', year: 1997 },
    { id: 12, artist: 'Manic Street Preachers', song: 'A Design for Life', album: 'Everything Must Go', year: 1996 },
    { id: 13, artist: 'Kasabian', song: 'Fire', album: 'Kasabian', year: 2004 },
    { id: 14, artist: 'Arctic Monkeys', song: 'I Bet You Look Good on the Dancefloor', album: 'Whatever People Say I Am, That\'s What I\'m Not', year: 2005 },
    { id: 15, artist: 'Primal Scream', song: 'Loaded', album: 'Screamadelica', year: 1990 },
    { id: 16, artist: 'Happy Mondays', song: 'Step On', album: 'Pills \'n\' Thrills and Bellyaches', year: 1990 },
    { id: 17, artist: 'Charlatans', song: 'The Only One I Know', album: 'Some Friendly', year: 1990 },
    { id: 18, artist: 'Inspiral Carpets', song: 'This Is How It Feels', album: 'Life', year: 1990 },
    { id: 19, artist: 'Lush', song: 'Ladykillers', album: 'Spooky', year: 1992 },
    { id: 20, artist: 'My Bloody Valentine', song: 'Only Shallow', album: 'Loveless', year: 1991 }
  ];

  const filteredSongs = () => {
    return britpopSongs.filter(song => {
      const matchesSearch = song.artist.toLowerCase().includes(searchTerm().toLowerCase()) ||
                           song.song.toLowerCase().includes(searchTerm().toLowerCase()) ||
                           song.album.toLowerCase().includes(searchTerm().toLowerCase());
      
      const matchesYear = selectedYear() === 'all' || song.year.toString() === selectedYear();
      
      return matchesSearch && matchesYear;
    });
  };

  const uniqueYears = () => {
    const years = [...new Set(britpopSongs.map(song => song.year))].sort((a, b) => b - a);
    return years;
  };

  const handlePlaySong = (song: Song) => {
    // Mock play functionality
    console.log(`Now playing: ${song.artist} - ${song.song}`);
  };

  return (
    <div class={styles.homeContainer}>
      <header class={styles.header}>
        <div class={styles.headerContent}>
          <div class={styles.logoSection}>
            <div class={styles.logo}>🎸</div>
            <div>
              <h1 class={styles.title}>Britpop Classics</h1>
              <p class={styles.subtitle}>The definitive collection of British alternative rock anthems</p>
            </div>
          </div>
          
          <div class={styles.userSection}>
            <img src={props.user.avatar} alt="User Avatar" class={styles.userAvatar} />
            <div class={styles.userInfo}>
              <span class={styles.userName}>{props.user.name}</span>
              <span class={styles.userEmail}>{props.user.email}</span>
            </div>
            <button class={styles.logoutBtn} onClick={props.onLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 0 1 2 2v2h-2V4H4v16h10v-2h2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10z"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div class={styles.controls}>
        <div class={styles.searchSection}>
          <div class={styles.searchBox}>
            <svg width="20" height="20" viewBox="0 0 24 24" class={styles.searchIcon}>
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search artists, songs, or albums..."
              class={styles.searchInput}
              value={searchTerm()}
              onInput={(e) => setSearchTerm(e.currentTarget.value)}
            />
          </div>
          
          <select 
            class={styles.yearFilter}
            value={selectedYear()}
            onChange={(e) => setSelectedYear(e.currentTarget.value)}
          >
            <option value="all">All Years</option>
            <For each={uniqueYears()}>
              {(year) => <option value={year.toString()}>{year}</option>}
            </For>
          </select>
        </div>

        <div class={styles.stats}>
          <div class={styles.statItem}>
            <span class={styles.statNumber}>{filteredSongs().length}</span>
            <span class={styles.statLabel}>Songs</span>
          </div>
          <div class={styles.statItem}>
            <span class={styles.statNumber}>{[...new Set(filteredSongs().map(s => s.artist))].length}</span>
            <span class={styles.statLabel}>Artists</span>
          </div>
          <div class={styles.statItem}>
            <span class={styles.statNumber}>{[...new Set(filteredSongs().map(s => s.year))].length}</span>
            <span class={styles.statLabel}>Years</span>
          </div>
        </div>
      </div>

      <main class={styles.songsGrid}>
        <For each={filteredSongs()}>
          {(song) => (
            <div 
              class={styles.songCard}
              onClick={() => handlePlaySong(song)}
            >
              <div class={styles.songHeader}>
                <h3 class={styles.songTitle}>{song.song}</h3>
                <button class={styles.playBtn}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              <p class={styles.songArtist}>{song.artist}</p>
              <div class={styles.songDetails}>
                <span class={styles.songAlbum}>{song.album}</span>
                <span class={styles.songYear}>{song.year}</span>
              </div>
            </div>
          )}
        </For>
      </main>

      {filteredSongs().length === 0 && (
        <div class={styles.emptyState}>
          <div class={styles.emptyIcon}>🔍</div>
          <h3>No songs found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Home;