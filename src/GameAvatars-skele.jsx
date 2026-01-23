import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '32px 16px',
    height: '100%'
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    backgroundColor: '#020617',
    color: '#fff',
    padding: '24px',
    position: 'relative',
    boxSizing: 'border-box'
  },
  pixelCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
    opacity: 0.4
  },
  menuContent: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '55%',
    backgroundColor: '#2e3144ff',
    border: '2px solid grey',
    height: 'auto',
    borderRadius: '5px',
    padding: '25px'
  },
  title: {
    fontSize: '6rem',
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: '-0.05em',
    background: "linear-gradient(to right, #371ca1ff, #6163ea)",
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '40px',
    marginTop: "10px",
    textAlign: 'center',
    padding: "20px"
  },
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24px',
    marginBottom: '32px',
    width: '100%',
    maxWidth: '672px',
  },
  avatarCard: {
    backgroundColor: '#1e293b',
    padding: '24px',
    borderRadius: '16px',
    border: '2px solid grey',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  avatarCircle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '165px',
    width: '165px',
    backgroundColor: '#0f172a',
    borderRadius: '50%',
    // border: '4px solid #334155',
    marginBottom: '16px',
    position: 'relative',

    margin: '0 auto 16px auto', // Combined margin-bottom and margin-auto
    overflow: 'hidden',

    // 1. THE BRIGHT CORE
    // Pure white border for that "high-voltage" look
    border: '2px solid #ffffffb6',

    // 2. THE WHITE-DOMINANT GLOW
    // We stack multiple white layers before hitting the purple tint
    boxShadow: `
    0 0 5px #ffffff80,      /* Crisp white core glow */
    0 0 5px #ffffff65,      /* Intense white secondary glow */
    0 0 45px #d393f86c,      /* Soft purple aura (outer) */
    0 0 60px #955fb979,      /* Deep violet fade */
    inset 0 0 30px #ffffff5b, /* Light bleeding INTO the circle */
    inset 0 0 50px rgba(216, 155, 252, 0.4) /* Subtle purple tint on avatar */
  `,

    // 3. 3D "POP"
    // Gives it a slight lift from the background
    filter: 'drop-shadow(0 0 38px rgba(255, 255, 255, 0.2))',
  },
  avatarLoading: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    color: '#64748b',
    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  avatarSprite: {
    width: '80px',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    transform: 'scale(1.98)',
    imageRendering: 'pixelated',
    animation: 'turnAround 2s ease-in-out forwards',
    backgroundColor: 'rgba(97, 99, 234, 0.3)'
  },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    textAlign: 'center',
  },
  labelGreen: {
    color: '#4ade80',
  },
  labelBlue: {
    color: '#60a5fa',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#0f172a',
    borderRadius: '12px',
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: '18px',
    outline: 'none',
    boxSizing: 'border-box',
    border: '2px solid transparent',
    transition: 'border-color 0.2s',
  },
  inputGreen: {
    border: '2px solid #4ade80',
  },
  inputBlue: {
    border: '2px solid #60a5fa',
  },
  difficultyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '32px',
    width: '100%',
    maxWidth: '448px',
  },
  difficultyButton: {
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid transparent',
    backgroundColor: '#1e293b',
    opacity: 0.6,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#fff',
  },
  difficultyButtonActive: {
    backgroundColor: '#334155',
    border: '2px solid #fff',
    transform: 'scale(1.05)',
    fontWeight: '900',
    opacity: 1,
  },
  kickoffButton: {
    padding: '16px 64px',
    fontWeight: '900',
    fontSize: '24px',
    borderRadius: '9999px',
    transition: 'all 0.2s',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.2)',
    marginBottom: '25px',
    marginTop: '25px'
  },
  kickoffButtonEnabled: {
    backgroundColor: '#fff',
    color: '#000',
  },
  kickoffButtonDisabled: {
    backgroundColor: '#475569',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  gameOverContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100%',
    backgroundColor: '#020617',
    color: '#fff',
    paddingTop: '10%'
  },
  gameOverTitle: {
    fontSize: '4.5rem',
    fontWeight: '900',
    marginTop: '16px',
    textTransform: 'uppercase',
    fontStyle: 'italic',
    letterSpacing: '-0.05em',
  },
  returnButton: {
    marginTop: '48px',
    padding: '20px 48px',
    backgroundColor: '#fff',
    color: '#000',
    fontWeight: '900',
    borderRadius: '9999px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s',
  },
  scoreHeader: {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    padding: '0 32px',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingTop: '24px',
    paddingBottom: '24px',
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    borderTop: '1px solid #334155',
    borderLeft: '1px solid #334155',
    borderRight: '1px solid #334155',
    backdropFilter: 'blur(12px)',
    marginTop: '125px'
  },
  scoreBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  scoreInner: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '16px 24px',
    borderRadius: '16px',
    border: '2px solid #1e293b',
    boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
  },
  scoreText: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: '900',
    letterSpacing: '0.1em',
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  modeBadge: {
    fontSize: '10px',
    fontWeight: '700',
    color: '#64748b',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    padding: '4px 16px',
    borderRadius: '9999px',
    border: '1px solid #334155',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  canvas: {
    borderLeft: '1px solid #1e293b',
    borderRight: '1px solid #1e293b',
    borderBottom: '1px solid #1e293b',
    borderBottomLeftRadius: '24px',
    borderBottomRightRadius: '24px',
    boxShadow: '0 0 80px rgba(0, 0, 0, 0.8)',
    backgroundColor: '#14532d',
  },
  quitButton: {
    marginTop: '32px',
    marginBottom: '150px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 32px',
    backgroundColor: 'rgba(220, 38, 38, 0.1)',
    color: '#ef4444',
    fontWeight: '700',
    borderRadius: '9999px',
    transition: 'all 0.2s',
    textTransform: 'uppercase',
    fontSize: '10px',
    letterSpacing: '0.1em',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },

};

const skeleAvatars = ['16102', '11355', '15710', '9700', '16633', '3595']



const diffConfig = {
  easy: { aiSpeed: 2.5, playerSpeed: 2.5, ballFriction: 0.98, aiIntelligence: 1, shootForce: 18 },
  medium: { aiSpeed: 2.75, playerSpeed: 2.75, ballFriction: 0.985, aiIntelligence: 1, shootForce: 21 },
  hard: { aiSpeed: 3, playerSpeed: 3, ballFriction: 0.99, aiIntelligence: 1, shootForce: 22, skeletonSpeed: 1.75 },
  "30": { duration: 30 },
  "60": { duration: 60 },
  "90": { duration: 90 },

};

const signs = [
  { r: 0, c: 2, text: "Meebits are fun!" },
  { r: 0, c: 11, text: "Meebits are art!" },
  { r: 1, c: 4, text: "Meebits are art!" },
  { r: 1, c: 9, text: "Meebits are fun!" },
  { r: 2, c: 1, text: "Meebin!" }
];

const CROWD_HEIGHT = 120;
const CROWD_ROWS = 3;
const FANS_PER_ROW = 14;
const CROWD_COUNT = CROWD_ROWS * FANS_PER_ROW;
const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 500 + CROWD_HEIGHT;
const GOAL_WIDTH = 25;
const GOAL_HEIGHT = 160;
const SPRITE_WIDTH = 85;
const SPRITE_HEIGHT = 85;
const SPRITE_SCALE = 0.6;
const PLAYER_SIZE = SPRITE_WIDTH * SPRITE_SCALE;
const BALL_RADIUS = 14;


const MeebitAvatar = React.memo(({ id, loaded }) => {
  // Debug: If this shows in console, the component is trying to render
  console.log("Rendering Meebit:", id);

  return (
    <div key={id} style={{
      ...styles.avatarCircle,
      perspective: '1000px'
    }}>
      {!loaded && <div style={styles.avatarLoading}>LOADING...</div>}
      {loaded && (
        <div
          style={{
            ...styles.avatarSprite,
            backgroundImage: `url(https://corsproxy.io/?${encodeURIComponent(`https://files.meebits.app/sprites/${id}.png`)})`,
            backgroundPositionX: '0px',
            transformOrigin: 'center bottom',
          }}
        />
      )}
    </div>
  );
}, (prev, next) => prev.id === next.id && prev.loaded === next.loaded);


const MiniSoccer = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('menu');
  const [difficulty, setDifficulty] = useState('medium');

  // ADD:
  const [gameMode, setGameMode] = useState('30');
  const [timeRemaining, setTimeRemaining] = useState(30);

  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);

  const [meebitNumber, setMeebitNumber] = useState('2446');
  const [aiMeebitNumber, setAiMeebitNumber] = useState('17600');

  const pixelCanvasRef = useRef(null);
  const pixelAnimationRef = useRef(null)

  const [spriteLoaded, setSpriteLoaded] = useState(false);
  const [aiSpriteLoaded, setAiSpriteLoaded] = useState(false);
  const [introAnimation, setIntroAnimation] = useState(null);

  const skeleton1ImageRef = useRef(null);
  const skeleton2ImageRef = useRef(null);
  const [skeleton1Loaded, setSkeleton1Loaded] = useState(false);
  const [skeleton2Loaded, setSkeleton2Loaded] = useState(false);

  const spriteImageRef = useRef(null);
  const aiSpriteImageRef = useRef(null);

  const crowdAudioRef = useRef(null); // ADD THIS

  // ADD THIS NEW REF RIGHT AFTER:
  const deathSoundRef = useRef(null);


  const crowdSpritesRef = useRef([]);
  const [crowdLoaded, setCrowdLoaded] = useState(false);


  const gameRef = useRef({
    players: [
      { x: 150, y: 200 + CROWD_HEIGHT, vx: 0, vy: 0, team: 'player', lastDir: { x: 1, y: 0 }, shotTimer: 0, frame: 0, animTimer: 0, alive: true },
      { x: 150, y: 300 + CROWD_HEIGHT, vx: 0, vy: 0, team: 'player', lastDir: { x: 1, y: 0 }, shotTimer: 0, frame: 0, animTimer: 0, alive: true }
    ],
    ai: [
      {
        x: 650,
        y: 200 + CROWD_HEIGHT,
        vx: 0,
        vy: 0,
        team: 'ai',
        role: 'attacker',        // ✅ CHANGED: More clear naming
        lastDir: { x: -1, y: 0 },
        frame: 0,
        animTimer: 0
      },
      {
        x: 750,                   // ✅ CHANGED: Start closer to goal
        y: 300 + CROWD_HEIGHT,
        vx: 0,
        vy: 0,
        team: 'ai',
        role: 'goalkeeper',       // ✅ CHANGED: Clear goalkeeper role
        lastDir: { x: -1, y: 0 },
        frame: 0,
        animTimer: 0
      }
    ],
    skeletons: [],
    ball: { x: FIELD_WIDTH / 2, y: (500 / 2) + CROWD_HEIGHT, vx: 0, vy: 0, rotation: 0 },
    keys: {},
    selectedPlayer: 0,
    possessor: null,
    isPaused: false,
    stuckTimer: 0,
    gameStartTime: null,
    deathAnimations: [],
    skeletonsSpawned: false,        // ADD: Track if skeletons have spawned
    skeletonSpawnTimer: 0,           // ADD: Count frames until spawn
    skeletonSpawnAnimations: []      // ADD: Track spawn animations
  });

  const animationRef = useRef(null);

  const resetPositions = () => {
    const g = gameRef.current;
    g.ball = { x: FIELD_WIDTH / 2, y: (500 / 2) + CROWD_HEIGHT, vx: 0, vy: 0, rotation: 0 };
    g.possessor = null;
    g.stuckTimer = 0;
    g.players.forEach((p, i) => {
      p.x = 150; p.y = (i === 0 ? 200 : 300) + CROWD_HEIGHT;
      p.vx = 0; p.vy = 0; p.shotTimer = 0;
      p.alive = true; // ADD THIS
    });


    // REPLACE THIS SECTION - Reset skeleton spawn state instead of spawning immediately
    if (difficulty === 'hard') {
      g.skeletons = []; // Start with no skeletons
      g.skeletonsSpawned = false; // Mark as not spawned
      g.skeletonSpawnTimer = 0; // Reset timer
      g.skeletonSpawnAnimations = []; // Clear any animations
    } else {
      g.skeletons = [];
      g.skeletonsSpawned = false;
    }

    g.ai.forEach((p, i) => {
      // ✅ POSITION BASED ON ROLE
      if (p.role === 'goalkeeper') {
        // Goalkeeper stays in front of goal
        p.x = 750;  // Close to goal line (FIELD_WIDTH = 800)
        p.y = (500 / 2) + CROWD_HEIGHT;  // Centered vertically
      } else {
        // Attacker starts at midfield
        p.x = 550;
        p.y = (i === 0 ? 200 : 300) + CROWD_HEIGHT;
      }
      p.vx = 0;
      p.vy = 0;
    });
    // g.gameStartTime = Date.now();
    g.keys = {};
    g.deathAnimations = []
  };

useEffect(() => {
    if (gameState !== 'menu' || !pixelCanvasRef.current) return;

    const canvas = pixelCanvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization: Disable alpha channel if not needed

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const pixelSize = 20; 
    const cols = Math.ceil(canvas.width / pixelSize);
    const rows = Math.ceil(canvas.height / pixelSize);

    // Create pixel grid with RANDOM PHASE (0 to 2PI) instead of brightness
    const pixels = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        pixels.push({
          x: x * pixelSize,
          y: y * pixelSize,
          // Initialize directly at a random point in the sine wave cycle
          phase: Math.random() * Math.PI * 2, 
          // This determines how fast the color pulses (try 0.05 to 0.1)
          speed: 0.02
        });
      }
    }

    const animate = () => {
      // Optimization: No need to clearRect if we overwrite every pixel every frame
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      pixels.forEach(pixel => {
        // Increment the phase directly
        pixel.phase += pixel.speed;

        // Calculate value (0 to 1)
        // No multiplier needed inside sin() because we control the speed directly above
        const value = Math.sin(pixel.phase) * 0.5 + 0.5;

        // Mix between dark blue and light purple
        // Math.floor is important for performance
        const r = Math.floor(20 + value * 77); 
        const g = Math.floor(20 + value * 79); 
        const b = Math.floor(40 + value * 194); 

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
      });

      pixelAnimationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (pixelAnimationRef.current) {
        cancelAnimationFrame(pixelAnimationRef.current);
      }
    };
  }, [gameState]);

  // ADD THIS ENTIRE NEW EFFECT - Initialize death sound
  useEffect(() => {
    // Initialize the death sound object
    if (!deathSoundRef.current) {
      // You can use a different sound file path here
      deathSoundRef.current = new Audio('../evil-sound.mp3'); // Change to your sound file
      deathSoundRef.current.volume = 0.5; // Adjust volume (0.0 to 1.0)
      deathSoundRef.current.preload = 'auto'; // Preload the audio
    }

    // Cleanup on unmount
    return () => {
      if (deathSoundRef.current) {
        deathSoundRef.current.pause();
        deathSoundRef.current.currentTime = 0;
      }
    };
  }, []); // Empty dependency array - only runs once on mount


  useEffect(() => {
    const loadCrowd = async () => {
      const sprites = [];
      const randomIds = Array.from({ length: CROWD_COUNT }, () => Math.floor(Math.random() * 20000));

      const promises = randomIds.map(id => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = `https://corsproxy.io/?${encodeURIComponent(`https://files.meebits.app/sprites/${id}.png`)}`;
          img.onload = () => {
            sprites.push({ img, offset: Math.random() * Math.PI * 2 });
            resolve();
          };
          img.onerror = () => {
            setCrowdLoaded(false);
            resolve()
          };
        });
      });

      setIntroAnimation('walkInAndPose 0.8s ease-out forwards')

      await Promise.all(promises);
      crowdSpritesRef.current = sprites;
      setCrowdLoaded(true);
    };
    loadCrowd();
  }, []);

  // Load skeleton sprites
  useEffect(() => {
    const loadSkeletonSprite = async (id, ref, setLoaded) => {
      setLoaded(false);
      const spriteUrl = `https://corsproxy.io/?${encodeURIComponent(`https://files.meebits.app/sprites/${id}.png`)}`;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => { ref.current = img; setLoaded(true); };
      img.onerror = () => setLoaded(false);
      img.src = spriteUrl;
    };

    // 1. Calculate a random index based on the length of skeleAvatars
    const randomIndex = Math.floor(Math.random() * skeleAvatars.length);
    const randomIndex2 = Math.floor(Math.random() * skeleAvatars.length);

    if (difficulty === 'hard') {
      loadSkeletonSprite(skeleAvatars[randomIndex], skeleton1ImageRef, setSkeleton1Loaded);
      loadSkeletonSprite(skeleAvatars[randomIndex2], skeleton2ImageRef, setSkeleton2Loaded);
    }
  }, [difficulty, meebitNumber]);

  const loadSpriteAsset = async (id, isPlayer) => {
    const setLoaded = isPlayer ? setSpriteLoaded : setAiSpriteLoaded;
    const ref = isPlayer ? spriteImageRef : aiSpriteImageRef;
    setLoaded(false);
    const spriteUrl = `https://corsproxy.io/?${encodeURIComponent(`https://files.meebits.app/sprites/${id}.png`)}`;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { ref.current = img; setLoaded(true); };
    img.onerror = () => setLoaded(false);
    img.src = spriteUrl;
  };

  useEffect(() => { loadSpriteAsset(meebitNumber, true); }, [meebitNumber]);
  useEffect(() => { loadSpriteAsset(aiMeebitNumber, false); }, [aiMeebitNumber]);


  useEffect(() => {
    // Initialize the audio object if it doesn't exist
    if (!crowdAudioRef.current) {
      crowdAudioRef.current = new Audio('../cheering-sounds.mp3');
      crowdAudioRef.current.loop = true;
      crowdAudioRef.current.volume = 0.3; // Adjust volume as needed
    }

    if (gameState === 'playing') {
      // Play when game starts
      crowdAudioRef.current.play().catch(e => console.log("Audio play blocked by browser:", e));
    } else {
      // Pause and reset when in Menu or Game Over
      crowdAudioRef.current.pause();
      crowdAudioRef.current.currentTime = 0;
    }

    // Cleanup on unmount
    return () => {
      if (crowdAudioRef.current) {
        crowdAudioRef.current.pause();
      }
    };
  }, [gameState]);

  const getDirectionRow = (dirX, dirY) => {
    const angle = Math.atan2(dirY, dirX);
    const deg = (angle * 180 / Math.PI + 360) % 360;
    if (deg >= 315 || deg < 45) return 0;
    if (deg >= 45 && deg < 135) return 3;
    if (deg >= 135 && deg < 225) return 2;
    return 1;
  };

  // ADD THIS HELPER FUNCTION
  const playDeathSound = () => {
    if (deathSoundRef.current) {
      // Reset to beginning in case sound is already playing
      deathSoundRef.current.currentTime = 0;

      // Play the sound
      deathSoundRef.current.play().catch(e => {
        console.log("Death sound play blocked:", e);
      });
    }
  };

  const drawSprite = (ctx, player, isSelected, isPossessor) => {
    let img, isLoaded;

    if (player.team === 'skeleton') {
      img = player.spriteRef.current;
      isLoaded = img !== null;
    } else {
      img = player.team === 'player' ? spriteImageRef.current : aiSpriteImageRef.current;
      isLoaded = player.team === 'player' ? spriteLoaded : aiSpriteLoaded;
    }

    if (!img || !isLoaded) {
      ctx.fillStyle = player.team === 'player' ? 'rgba(255, 255, 0, 0.5)' : 'rgba(0, 255, 255, 0.5)';
      ctx.beginPath(); ctx.arc(player.x, player.y, PLAYER_SIZE / 2, 0, Math.PI * 2); ctx.fill();
      return;
    }
    const isMoving = Math.abs(player.vx) > 0.1 || Math.abs(player.vy) > 0.1;
    const row = getDirectionRow(player.lastDir.x, player.lastDir.y);
    // let frameCol = isMoving ? Math.floor(player.frame * 0.4) % 2 : 0;

    const walkCycle = [0, 1, 2, 1];
    let frameCol = isMoving ? walkCycle[Math.floor(player.frame / 2) % 4] : 0;

    const sx = frameCol * SPRITE_WIDTH;
    const sy = row * SPRITE_HEIGHT;
    const drawWidth = SPRITE_WIDTH * SPRITE_SCALE * 2.5;
    const drawHeight = SPRITE_HEIGHT * SPRITE_SCALE * 2.5;
    ctx.save();
    if (isSelected || isPossessor) {
      ctx.shadowBlur = 25;
      ctx.shadowColor = isPossessor ? '#ffffff33' : '#fbbe243d';
    }
    let adjustedSY = row === 3 ? sy - 12 : sy;
    adjustedSY = row === 2 ? adjustedSY - 10 : adjustedSY;
    ctx.imageSmoothingEnabled = false;
    const visualY = Math.floor(player.y - drawHeight + 25);
    ctx.drawImage(img, sx, adjustedSY, SPRITE_WIDTH, SPRITE_HEIGHT, Math.floor(player.x - drawWidth / 2), visualY, drawWidth, drawHeight);
    ctx.restore();
  };

  const drawStadium = (ctx) => {
    ctx.fillStyle = '#1e293b'; ctx.fillRect(0, 0, FIELD_WIDTH, CROWD_HEIGHT);
    ctx.strokeStyle = '#334155'; ctx.lineWidth = 1;
    for (let i = 0; i <= CROWD_ROWS; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * 32 + 10); ctx.lineTo(FIELD_WIDTH, i * 32 + 10); ctx.stroke();
    }
    if (!crowdLoaded) return;
    const time = Date.now() / 1500;
    const fanSize = 85;
    const spacing = FIELD_WIDTH / (FANS_PER_ROW + 1);


    for (let r = 0; r < CROWD_ROWS; r++) {
      for (let c = 0; c < FANS_PER_ROW; c++) {
        const fan = crowdSpritesRef.current[r * FANS_PER_ROW + c];
        if (!fan) continue;
        const jump = Math.sin(time * 5 + fan.offset) * 2;
        const stagger = (r % 2) * (spacing / 2);
        const x = spacing * (c + 1) - fanSize / 2 + stagger;
        const y = 5 + (r * 32) + jump;
        ctx.save();
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(fan.img, 0, 85 * 3 - 12, 85, 85, x, y, fanSize, fanSize);
        ctx.restore();

        const sign = signs.find(s => s.r === r && s.c === c);
        if (sign) {
          ctx.save();

          // 1. Set the font style FIRST so measurement is accurate
          ctx.font = 'bold 14px monospace';

          // 2. Calculate the dynamic width
          const padding = 20; // 10px on each side
          const textMetrics = ctx.measureText(sign.text);
          const signWidth = textMetrics.width + padding;

          const signHeight = 22;

          // 3. Recalculate sx so the dynamic box remains centered
          const sx = x + (fanSize / 2) - (signWidth / 2);
          const sy = y - 10;

          // Draw the Box
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.fillRect(sx, sy, signWidth, signHeight);
          ctx.strokeRect(sx, sy, signWidth, signHeight);

          // Draw the Text
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          // Center text exactly in the middle of the dynamic signWidth
          ctx.fillText(sign.text, sx + (signWidth / 2), sy + 15);

          ctx.restore();
        }
      }
    }
    ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(0, CROWD_HEIGHT, FIELD_WIDTH, 8);
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const settings = { ...diffConfig[difficulty], ...diffConfig[gameMode] };

    const shootBall = (force) => {
      const game = gameRef.current;
      if (game.possessor === null) return;
      const p = game.players[game.possessor];
      game.ball.vx = p.lastDir.x * force;
      game.ball.vy = p.lastDir.y * force;
      p.shotTimer = 25;
      game.possessor = null;
    };

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      gameRef.current.keys[key] = true;
      if (key === ' ') {
        e.preventDefault();
        gameRef.current.selectedPlayer = 1 - gameRef.current.selectedPlayer;
      }
      if (key === 'enter' && gameRef.current.possessor !== null) {
        e.preventDefault();
        shootBall(settings.shootForce);
      }
    };
    const handleKeyUp = (e) => { gameRef.current.keys[e.key.toLowerCase()] = false; };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      const game = gameRef.current;
      const ball = game.ball;
      if (!game.gameStartTime) {
        game.gameStartTime = Date.now();
      }
      const elapsedSeconds = (Date.now() - game.gameStartTime) / 1000;
      const remaining = settings.duration - elapsedSeconds;
      setTimeRemaining(Math.max(0, remaining));

      if (remaining <= 0) {
        setGameState('gameOver');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const goalTop = (500 / 2) - (GOAL_HEIGHT / 2) + CROWD_HEIGHT;

      if (!game.isPaused) {
        // ADD THIS ENTIRE SECTION - Skeleton spawn logic
        if (difficulty === 'hard' && !game.skeletonsSpawned) {
          game.skeletonSpawnTimer++;

          // Spawn after 3 seconds (180 frames at 60fps)
          if (game.skeletonSpawnTimer >= 120) {
            game.skeletonsSpawned = true;

            // Create skeletons with spawn positions
            const skeleton1Pos = { x: 400, y: 180 + CROWD_HEIGHT };
            const skeleton2Pos = { x: 400, y: 380 + CROWD_HEIGHT };

            game.skeletons = [
              {
                x: skeleton1Pos.x,
                y: skeleton1Pos.y,
                vx: 0,
                vy: 0,
                team: 'skeleton',
                lastDir: { x: -1, y: 0 },
                frame: 0,
                animTimer: 0,
                alive: true,
                spriteRef: skeleton1ImageRef,
                spawning: true // ADD: Flag to indicate spawning state
              },
              {
                x: skeleton2Pos.x,
                y: skeleton2Pos.y,
                vx: 0,
                vy: 0,
                team: 'skeleton',
                lastDir: { x: -1, y: 0 },
                frame: 0,
                animTimer: 0,
                alive: true,
                spriteRef: skeleton2ImageRef,
                spawning: true // ADD: Flag to indicate spawning state
              }
            ];

            // Create spawn animations (rising from ground effect)
            game.skeletonSpawnAnimations = [
              {
                x: skeleton1Pos.x,
                y: skeleton1Pos.y,
                spriteRef: skeleton1ImageRef,
                progress: 0,
                duration: 40, // 40 frames = ~0.67 seconds
                skeletonIndex: 0
              },
              {
                x: skeleton2Pos.x,
                y: skeleton2Pos.y,
                spriteRef: skeleton2ImageRef,
                progress: 0,
                duration: 40,
                skeletonIndex: 1
              }
            ];
          }
        }

        // Update spawn animations
        if (game.skeletonSpawnAnimations.length > 0) {
          game.skeletonSpawnAnimations = game.skeletonSpawnAnimations.filter(anim => {
            anim.progress++;

            // When animation completes, mark skeleton as fully spawned
            if (anim.progress >= anim.duration) {
              if (game.skeletons[anim.skeletonIndex]) {
                game.skeletons[anim.skeletonIndex].spawning = false;
              }
              return false; // Remove animation
            }

            return true; // Keep animation
          });
        }
        const isOutOfBounds = ball.x < -20 || ball.x > FIELD_WIDTH + 20 || ball.y < CROWD_HEIGHT - 20 || ball.y > FIELD_HEIGHT + 20;
        const isStuck = Math.abs(ball.vx) < 0.05 && Math.abs(ball.vy) < 0.05 && game.possessor === null;

        if (isStuck) game.stuckTimer++; else game.stuckTimer = 0;

        if (isOutOfBounds || game.stuckTimer > 300) {
          resetPositions();
        }
        // ball.rotation += speed * 0.15; 

        game.players.forEach((p, idx) => {
          if (!p.alive) return; // ADD THIS LINE
          if (p.shotTimer > 0) p.shotTimer--;
          if (idx === game.selectedPlayer) {
            const speed = settings.playerSpeed;
            p.vx = 0; p.vy = 0;
            if (game.keys['arrowleft'] || game.keys['a']) p.vx = -speed;
            if (game.keys['arrowright'] || game.keys['d']) p.vx = speed;
            if (game.keys['arrowup'] || game.keys['w']) p.vy = -speed;
            if (game.keys['arrowdown'] || game.keys['s']) p.vy = speed;
            if (p.vx !== 0 || p.vy !== 0) {
              const mag = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
              p.lastDir = { x: p.vx / mag, y: p.vy / mag };
              const moveSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
              p.animTimer += moveSpeed * 0.05; // The timer increments based on actual velocity
              p.frame = Math.floor(p.animTimer);
            }
          } else { p.vx *= 0.8; p.vy *= 0.8; }
        });

        game.ai.forEach((ai) => {
          let tx, ty;  // Target position

          // ✅ GOALKEEPER AI (MEDIUM & HARD ONLY)
          if (ai.role === 'goalkeeper' && (difficulty === 'medium' || difficulty === 'hard')) {
            // Goalkeeper behavior: Stay near goal, track ball vertically
            const goalX = difficulty === 'hard' ? (FIELD_WIDTH - 50) : (FIELD_WIDTH - 70);  // Stay 40px from goal line
            const goalCenterY = (500 / 2) + CROWD_HEIGHT;

            // Track ball's Y position, but stay in goal area
            if (ball.x > FIELD_WIDTH / 2) {
              // Ball is on AI's side - track it closely
              tx = goalX;
              ty = ball.y;

              // Clamp to goal area (don't leave the goal mouth)
              const goalTop = (500 / 2) - (GOAL_HEIGHT / 2) + CROWD_HEIGHT;
              const goalBottom = goalTop + GOAL_HEIGHT;
              ty = Math.max(goalTop + 20, Math.min(goalBottom - 20, ty));
            } else {
              // Ball is far away - stay centered in goal
              tx = goalX;
              ty = goalCenterY;
            }
          }
          // ✅ ATTACKER AI
          else if (ai.role === 'attacker') {
            if (difficulty === 'easy') {
              // Easy: Just chase ball directly (existing behavior)
              tx = ball.x;
              ty = ball.y;
            } else if (difficulty === 'medium') {
              // Medium: Predict ball movement slightly
              tx = ball.x + ball.vx * 1.5;
              ty = ball.y + ball.vy * 1.5;
            } else {
              // Hard: Smart positioning - predict and aim for player's goal
              tx = ball.x + ball.vx * 2;
              ty = ball.y + ball.vy * 2;

              // If ball is far, position between ball and player's goal
              if (ball.x < FIELD_WIDTH / 3) {
                const angleToGoal = Math.atan2(
                  ((500 / 2) + CROWD_HEIGHT) - ai.y,
                  50 - ai.x  // Player's goal X
                );
                tx = ball.x + Math.cos(angleToGoal) * 100;
                ty = ball.y + Math.sin(angleToGoal) * 100;
              }
            }
          }
          // ✅ FALLBACK FOR EASY MODE GOALKEEPER (acts like second attacker)
          else {
            // Easy mode: Both AI chase ball (no goalkeeper)
            tx = ball.x;
            ty = ball.y;
          }

          // ✅ MOVEMENT LOGIC (existing, but improved)
          const dx = tx - ai.x;
          const dy = ty - ai.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist > 5) {
            // Different speeds based on role and difficulty
            let moveSpeed = settings.aiSpeed;

            if (ai.role === 'goalkeeper') {
              // Goalkeeper is faster vertically, slower horizontally
              moveSpeed = difficulty === 'hard' ? 1.5 : settings.aiSpeed;
              moveSpeed = difficulty === 'medium' ? 1 : settings.aiSpeed;
            }

            ai.vx = (dx / dist) * moveSpeed;
            ai.vy = (dy / dist) * moveSpeed;

            const mag = Math.sqrt(ai.vx * ai.vx + ai.vy * ai.vy);
            if (mag > 0) ai.lastDir = { x: ai.vx / mag, y: ai.vy / mag };
            ai.animTimer++;
            if (ai.animTimer % 4 === 0) ai.frame++;
          }

          ai.vx *= 0.88;
          ai.vy *= 0.88;

          // ✅ BALL INTERACTION (existing code)
          const ballDist = Math.sqrt((ball.x - ai.x) ** 2 + (ball.y - ai.y) ** 2);
          if (ballDist < PLAYER_SIZE / 2 + BALL_RADIUS) {
            game.possessor = null;
            game.stuckTimer = 0;
            const angle = Math.atan2(ball.y - ai.y, ball.x - ai.x);
            const kickPower = 8 + (settings.aiIntelligence * 6);
            ball.vx = Math.cos(angle) * kickPower;
            ball.vy = Math.sin(angle) * kickPower;
          }
        });


        // Skeleton AI - Hunt the players
        game.skeletons.forEach((skeleton, idx) => {
          if (!skeleton.alive || skeleton.spawning) return; // ADD: Don't move while spawning

          // Find nearest alive player
          let nearestPlayer = null;
          let minDist = Infinity;

          game.players.forEach(p => {
            if (!p.alive) return;
            const dist = Math.sqrt((p.x - skeleton.x) ** 2 + (p.y - skeleton.y) ** 2);
            if (dist < minDist) {
              minDist = dist;
              nearestPlayer = p;
            }
          });

          if (nearestPlayer) {
            // Chase the player
            const dx = nearestPlayer.x - skeleton.x;
            const dy = nearestPlayer.y - skeleton.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 5) {
              const skeletonSpeed = settings.skeletonSpeed || 2.5;
              skeleton.vx = (dx / dist) * skeletonSpeed;
              skeleton.vy = (dy / dist) * skeletonSpeed;
              const mag = Math.sqrt(skeleton.vx * skeleton.vx + skeleton.vy * skeleton.vy);
              if (mag > 0) skeleton.lastDir = { x: skeleton.vx / mag, y: skeleton.vy / mag };
              skeleton.animTimer++;
              if (skeleton.animTimer % 4 === 0) skeleton.frame++;
            }

            skeleton.vx *= 0.88;
            skeleton.vy *= 0.88;

            // Check collision with player
            if (dist < PLAYER_SIZE / 2 + PLAYER_SIZE / 2) {
              if (skeleton.spawning) {
                return; // Don't check collisions while materializing
              }
              // Create death animation for both
              game.deathAnimations.push({
                skeletonX: skeleton.x,
                skeletonY: skeleton.y,
                playerX: nearestPlayer.x,
                playerY: nearestPlayer.y,
                collisionX: (skeleton.x + nearestPlayer.x) / 2, // ADD: Midpoint of collision
                collisionY: (skeleton.y + nearestPlayer.y) / 2, // ADD: Midpoint of collision
                skeletonSprite: skeleton.spriteRef,
                playerSprite: spriteImageRef,
                progress: 0,
                duration: 30 // frames
              });

              // ADD THIS LINE - Play death sound
              playDeathSound();

              // NEW: Reset possession so the ball drops if the player dies
              if (game.possessor === game.players.indexOf(nearestPlayer)) {
                game.possessor = null;
                game.ball.vx = (Math.random() - 0.5) * 5; // Give ball a little bump
                game.ball.vy = (Math.random() - 0.5) * 5;
              }

              // Kill both skeleton and player
              skeleton.alive = false;
              nearestPlayer.alive = false;

              // If selected player died, switch to other player if alive
              if (game.selectedPlayer === game.players.indexOf(nearestPlayer)) {
                const otherPlayerIdx = game.selectedPlayer === 0 ? 1 : 0;
                if (game.players[otherPlayerIdx].alive) {
                  game.selectedPlayer = otherPlayerIdx;
                }
              }

              // Check if all players are dead - award goal to AI and reset
              const anyPlayerAlive = game.players.some(p => p.alive);
              if (!anyPlayerAlive) {
                // Award goal to AI team
                handleScore('ai');
                // Reset will happen automatically via handleScore's setTimeout
              }
            }

          }
        });

        // Update skeleton positions
        game.skeletons.forEach(skeleton => {
          if (!skeleton.alive) return;
          skeleton.x += skeleton.vx;
          skeleton.y += skeleton.vy;
          skeleton.x = Math.max(PLAYER_SIZE / 2, Math.min(FIELD_WIDTH - PLAYER_SIZE / 2, skeleton.x));
          skeleton.y = Math.max(CROWD_HEIGHT + PLAYER_SIZE / 2, Math.min(FIELD_HEIGHT - PLAYER_SIZE / 2, skeleton.y));
        });

        // Update death animations
        game.deathAnimations = game.deathAnimations.filter(anim => {
          anim.progress++;
          return anim.progress < anim.duration;
        });

        [...game.players, ...game.ai].forEach(p => {
          if (!p.alive && p.team === 'player') return; // Only skip dead players
          p.x += p.vx; p.y += p.vy;
          p.x = Math.max(PLAYER_SIZE / 2, Math.min(FIELD_WIDTH - PLAYER_SIZE / 2, p.x));
          p.y = Math.max(CROWD_HEIGHT + PLAYER_SIZE / 2, Math.min(FIELD_HEIGHT - PLAYER_SIZE / 2, p.y));

          // ✅ GOALKEEPER CONSTRAINTS
          if (p.team === 'ai' && p.role === 'goalkeeper' && (difficulty === 'medium' || difficulty === 'hard')) {
            // Goalkeeper can't leave defensive third
            const minX = (FIELD_WIDTH * 2 / 3);  // Stay in right third
            const maxX = FIELD_WIDTH - PLAYER_SIZE / 2;
            p.x = Math.max(minX, Math.min(maxX, p.x));

            // Restrict to goal area vertically
            const goalTop = (500 / 2) - (GOAL_HEIGHT / 2) + CROWD_HEIGHT;
            const goalBottom = goalTop + GOAL_HEIGHT;
            p.y = Math.max(goalTop, Math.min(goalBottom, p.y));
          }
          // ✅ REGULAR PLAYER/ATTACKER CONSTRAINTS
          else {
            p.x = Math.max(PLAYER_SIZE / 2, Math.min(FIELD_WIDTH - PLAYER_SIZE / 2, p.x));
            p.y = Math.max(CROWD_HEIGHT + PLAYER_SIZE / 2, Math.min(FIELD_HEIGHT - PLAYER_SIZE / 2, p.y));
          }
        });

        if (game.possessor !== null) {
          const p = game.players[game.possessor];

          // ✅ UPDATE: Ball follows player
          ball.x = p.x + p.lastDir.x * (PLAYER_SIZE / 2 + 5);
          ball.y = p.y + p.lastDir.y * (PLAYER_SIZE / 2 + 5);
          ball.vx = p.vx;
          ball.vy = p.vy;

          // ✅ ROTATE based on player speed
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 0.1) {
            ball.rotation += speed * 0.15;
          }
        } else {
          // ✅ CHECK: Can any player pick up the ball?
          game.players.forEach((p, idx) => {
            if (!p.alive) return;
            if (p.shotTimer === 0) {
              const dist = Math.sqrt((ball.x - p.x) ** 2 + (ball.y - p.y) ** 2);
              if (dist < PLAYER_SIZE / 2 + BALL_RADIUS + 2) game.possessor = idx;
            }
          });

          // ✅ UPDATE: Ball moves freely
          ball.x += ball.vx;
          ball.y += ball.vy;
          ball.vx *= settings.ballFriction;
          ball.vy *= settings.ballFriction;

          // ✅ ADD: ROTATE based on ball velocity (THIS IS THE KEY FIX!)
          const ballSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
          if (ballSpeed > 0.1) {
            // Rotation slows down as ball slows down
            const rotationSpeed = Math.min(ballSpeed * 0.15, 0.5);
            ball.rotation += rotationSpeed;
          }
        }

        const goalBottom = goalTop + GOAL_HEIGHT;
        if (ball.y - BALL_RADIUS < CROWD_HEIGHT || ball.y + BALL_RADIUS > FIELD_HEIGHT) ball.vy *= -0.8;
        if (ball.x - BALL_RADIUS < 0) {
          if (ball.y > goalTop && ball.y < goalBottom) handleScore('ai');
          else { ball.vx *= -0.8; ball.x = BALL_RADIUS; }
        }
        if (ball.x + BALL_RADIUS > FIELD_WIDTH) {
          if (ball.y > goalTop && ball.y < goalBottom) handleScore('player');
          else { ball.vx *= -0.8; ball.x = FIELD_WIDTH - BALL_RADIUS; }
        }
      }

      ctx.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
      drawStadium(ctx);
      ctx.fillStyle = '#162b0e'; ctx.fillRect(0, CROWD_HEIGHT, FIELD_WIDTH, 500);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 3;
      ctx.strokeRect(10, CROWD_HEIGHT + 10, FIELD_WIDTH - 20, 500 - 20);
      ctx.beginPath(); ctx.moveTo(FIELD_WIDTH / 2, CROWD_HEIGHT); ctx.lineTo(FIELD_WIDTH / 2, FIELD_HEIGHT); ctx.stroke();

      const drawGoal = (x, isPlayerSide) => {
        ctx.save(); ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; ctx.lineWidth = 1;
        for (let i = 0; i <= GOAL_HEIGHT; i += 12) {
          ctx.beginPath(); ctx.moveTo(x, goalTop + i); ctx.lineTo(isPlayerSide ? x + GOAL_WIDTH : x - GOAL_WIDTH, goalTop + i); ctx.stroke();
        }
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 5; ctx.strokeRect(isPlayerSide ? 0 : FIELD_WIDTH - GOAL_WIDTH, goalTop, GOAL_WIDTH, GOAL_HEIGHT);
        ctx.restore();
      };
      drawGoal(0, true); drawGoal(FIELD_WIDTH, false);
      game.players.forEach((p, i) => {
        if (p.alive) {
          drawSprite(ctx, p, i === game.selectedPlayer, game.possessor === i);
        }
      });
      game.ai.forEach((p) => drawSprite(ctx, p, false, false));

      // Draw skeletons (ADD THIS HERE)
      game.skeletons.forEach((skeleton) => {
        if (skeleton.alive) {
          drawSprite(ctx, skeleton, false, false);
        }
        // Draw skeleton spawn animations
        game.skeletonSpawnAnimations.forEach(anim => {
          const spawnProgress = anim.progress / anim.duration; // 0 to 1

          // Rising effect: skeleton rises from 50 pixels below ground
          const riseDistance = 50 * (1 - spawnProgress); // Starts at 50, ends at 0
          const currentY = anim.y + riseDistance;

          // Fade in effect
          const opacity = Math.min(1, spawnProgress * 2); // Fade in during first 50%

          ctx.save();
          ctx.globalAlpha = opacity;

          // Draw ground crack/portal effect
          if (spawnProgress < 0.7) { // Show portal for first 70% of animation
            const crackProgress = spawnProgress / 0.7;
            const crackWidth = 60 + (crackProgress * 20); // Expands
            const crackOpacity = (1 - crackProgress) * 0.6;

            // Dark purple glow
            const gradient = ctx.createRadialGradient(
              anim.x, anim.y, 0,
              anim.x, anim.y, crackWidth
            );
            gradient.addColorStop(0, `rgba(138, 43, 226, ${crackOpacity})`); // Purple center
            gradient.addColorStop(0.5, `rgba(75, 0, 130, ${crackOpacity * 0.5})`); // Indigo middle
            gradient.addColorStop(1, 'rgba(75, 0, 130, 0)'); // Transparent edge

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(anim.x, anim.y, crackWidth, 0, Math.PI * 2);
            ctx.fill();

            // Pulsing crack lines
            ctx.strokeStyle = `rgba(138, 43, 226, ${crackOpacity * 0.8})`;
            ctx.lineWidth = 2;
            for (let i = 0; i < 8; i++) {
              const angle = (i * Math.PI / 4) + (crackProgress * Math.PI / 4);
              const length = 30 * crackProgress;
              ctx.beginPath();
              ctx.moveTo(anim.x, anim.y);
              ctx.lineTo(
                anim.x + Math.cos(angle) * length,
                anim.y + Math.sin(angle) * length
              );
              ctx.stroke();
            }
          }

          // Draw the skeleton sprite rising
          if (anim.spriteRef && anim.spriteRef.current) {
            const img = anim.spriteRef.current;
            const drawWidth = SPRITE_WIDTH * SPRITE_SCALE * 2.5;
            const drawHeight = SPRITE_HEIGHT * SPRITE_SCALE * 2.5;

            ctx.imageSmoothingEnabled = false;

            // Draw skeleton with vertical offset
            ctx.drawImage(
              img,
              0, 0, // Front-facing sprite
              SPRITE_WIDTH, SPRITE_HEIGHT,
              Math.floor(anim.x - drawWidth / 2),
              Math.floor(currentY - drawHeight + 25),
              drawWidth, drawHeight
            );
          }

          ctx.restore();
        });
      });

      // Draw death animations
      game.deathAnimations.forEach(anim => {
        const fallProgress = anim.progress / anim.duration;
        const fallDistance = 30 * fallProgress; // Fall 30 pixels
        const opacity = 1 - fallProgress; // Fade out

        ctx.save();
        ctx.globalAlpha = opacity;

        // ADD THIS ENTIRE SECTION - Red aura effect
        if (anim.progress < anim.duration * 0.6) { // Only show aura for first 60% of animation
          const auraProgress = anim.progress / (anim.duration * 0.6);
          const auraRadius = 40 + (auraProgress * 60); // Expands from 40 to 100
          const auraOpacity = (1 - auraProgress) * 0.7; // Fades from 0.7 to 0

          // Create radial gradient for "explosion" effect
          const gradient = ctx.createRadialGradient(
            anim.collisionX, anim.collisionY, 0,
            anim.collisionX, anim.collisionY, auraRadius
          );
          gradient.addColorStop(0, `rgba(255, 0, 0, ${auraOpacity})`); // Bright red center
          gradient.addColorStop(0.5, `rgba(220, 0, 0, ${auraOpacity * 0.5})`); // Dark red middle
          gradient.addColorStop(1, 'rgba(255, 0, 0, 0)'); // Transparent edge

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(anim.collisionX, anim.collisionY, auraRadius, 0, Math.PI * 2);
          ctx.fill();

          // Add pulsing ring effect
          const ringRadius = 30 + (auraProgress * 50);
          ctx.strokeStyle = `rgba(255, 50, 50, ${(1 - auraProgress) * 0.8})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(anim.collisionX, anim.collisionY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw dying skeleton
        if (anim.skeletonSprite && anim.skeletonSprite.current) {
          const skeleImg = anim.skeletonSprite.current;
          const drawWidth = SPRITE_WIDTH * SPRITE_SCALE * 2.5;
          const drawHeight = SPRITE_HEIGHT * SPRITE_SCALE * 2.5;
          ctx.drawImage(
            skeleImg,
            0, 0, SPRITE_WIDTH, SPRITE_HEIGHT,
            Math.floor(anim.skeletonX - drawWidth / 2),
            Math.floor(anim.skeletonY - drawHeight + 25 + fallDistance),
            drawWidth, drawHeight
          );
        }

        // Draw dying player
        if (anim.playerSprite && anim.playerSprite.current) {
          const playerImg = anim.playerSprite.current;
          const drawWidth = SPRITE_WIDTH * SPRITE_SCALE * 2.5;
          const drawHeight = SPRITE_HEIGHT * SPRITE_SCALE * 2.5;
          ctx.drawImage(
            playerImg,
            0, 0, SPRITE_WIDTH, SPRITE_HEIGHT,
            Math.floor(anim.playerX - drawWidth / 2),
            Math.floor(anim.playerY - drawHeight + 25 + fallDistance),
            drawWidth, drawHeight
          );
        }

        ctx.restore();
      });

      // PIXELATED BALL WITH BLACK SQUARED SHAPES AND CONDITIONAL ROTATION
      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.rotate(ball.rotation);

      // Shadow for ball
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Ball background
      ctx.beginPath();
      ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      // Pixelated black squares for pattern
      ctx.fillStyle = '#000';
      const squareSize = 3;
      const numSquares = 20; // Number of black squares
      for (let i = 0; i < numSquares; i++) {
        const angle = (i * (2 * Math.PI / numSquares)) + ball.rotation; // Rotate squares
        const dist = 9.9; // Random distance from center
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        ctx.fillRect(x - squareSize / 5, y - squareSize / 5, squareSize, squareSize);
      }

      // Border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    const handleScore = (team) => {
      const g = gameRef.current; g.isPaused = true;
      if (team === 'player') setPlayerScore(s => s + 1); else setAiScore(s => s + 1);
      setTimeout(() => { resetPositions(); g.isPaused = false; }, 1200);
    };

    gameLoop();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationRef.current);
    };
  }, [gameState, difficulty, playerScore, aiScore, spriteLoaded, aiSpriteLoaded, crowdLoaded]);

  const quitToMenu = () => {
    resetPositions();
    setPlayerScore(0);
    setAiScore(0);

    // 1. Reset the visual timer immediately
    setTimeRemaining(parseInt(gameMode));

    // 2. CRITICAL FIX: Reset the internal timer reference
    // This forces the next game to generate a NEW start timestamp
    gameRef.current.gameStartTime = null;


    setGameState('menu');

    window.scrollTo({ top: 0, behavior: 'smooth' });

  };



  const startMatch = () => {
    resetPositions(); // Forces all 'alive' flags to true and positions to start
    setGameState('playing');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  if (gameState === 'menu') {
    const isAssetsReady = spriteLoaded && aiSpriteLoaded && crowdLoaded;

    console.log(isAssetsReady, 'isAssetsReady ??????')
    return (
      <div style={styles.menuContainer}>
        <canvas ref={pixelCanvasRef} style={styles.pixelCanvas} />
        <div style={styles.menuContent}>
          <h1 className='neon-title'>Meebits Mini Soccer</h1>
          {/* <h1 style={styles.title}>Meebits Mini Soccer</h1> */}
          <div style={{ ...styles.avatarGrid, gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr' }}>
            <div style={styles.avatarCard}>
              <MeebitAvatar id={meebitNumber} loaded={spriteLoaded} />
              <label style={{ ...styles.label, ...styles.labelGreen }}>Home Team</label>
              <input type="text" value={meebitNumber} onChange={(e) => setMeebitNumber(e.target.value.replace(/\D/g, ''))} style={styles.input} />
            </div>
            <div style={styles.avatarCard}>
              <MeebitAvatar id={aiMeebitNumber} loaded={aiSpriteLoaded} />
              <label style={{ ...styles.label, ...styles.labelBlue }}>Away Team</label>
              <input type="text" value={aiMeebitNumber} onChange={(e) => setAiMeebitNumber(e.target.value.replace(/\D/g, ''))} style={styles.input} />
            </div>
          </div>

          <p style={{ ...styles.scoreText, fontSize: "22px" }}> Difficulty:</p>
          <div style={styles.difficultyGrid}>

            {['easy', 'medium', 'hard'].map(lvl => (
              <button key={lvl} onClick={() => setDifficulty(lvl)} style={difficulty === lvl ? { ...styles.difficultyButton, ...styles.difficultyButtonActive } : styles.difficultyButton}>
                <span>{lvl.toUpperCase()}</span>
              </button>
            ))}
          </div>
          <p style={{ ...styles.scoreText, fontSize: "22px" }}> Duration:</p>
          <div style={styles.difficultyGrid}>
            {['30', '60', '90'].map(mode => (
              <button
                key={mode}
                onClick={() => {
                  setGameMode(mode);
                  setTimeRemaining(parseInt(mode));
                }}
                style={gameMode === mode ? { ...styles.difficultyButton, ...styles.difficultyButtonActive } : styles.difficultyButton}
              >
                <span>{mode} SEC</span>
              </button>
            ))}
          </div>
          <p style={{ ...styles.scoreText, fontSize: "22px" }}> Controls:</p>
          <p style={{ ...styles.scoreText, fontSize: "18px", textAlign: 'center' }}>Move: "WASD" | Swap: "Space" | Shoot: "Enter"</p>


          <button
            onClick={startMatch}
            disabled={!isAssetsReady}
            style={!isAssetsReady ?
              { ...styles.kickoffButton, ...styles.kickoffButtonDisabled } :
              { ...styles.kickoffButton, ...styles.kickoffButtonEnabled }
            }
          >
            {isAssetsReady ? "KICK OFF" : "LOADING ASSETS..."}
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div style={styles.gameOverContainer}>
        <Trophy size={100} color="#facc15" />
        <h1 style={styles.gameOverTitle}>
          {playerScore > aiScore ? 'Champion!' : playerScore < aiScore ? 'Defeated' : 'Draw!'}
        </h1>
        <button onClick={quitToMenu} style={styles.returnButton}>Return to Lobby</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.scoreHeader}>
        <div style={styles.scoreBox}>
          <span style={{ ...styles.modeBadge, color: 'white', fontWeight: 'bold', fontSize: 16 }}>difficulty - {difficulty}</span>
          <div style={styles.scoreInner}><span style={styles.scoreText}>HOME - {playerScore} : AWAY - {aiScore}</span></div>
          <span style={{ ...styles.modeBadge, color: 'white', fontWeight: 'bold', fontSize: 16 }}>{timeRemaining.toFixed(2)} sec Remaining</span>
        </div>
      </div>
      <canvas ref={canvasRef} width={FIELD_WIDTH} height={FIELD_HEIGHT} style={styles.canvas} />
      <button onClick={quitToMenu} style={styles.quitButton}><RotateCcw size={14} /> Quit Match</button>
    </div>
  );
};

export default MiniSoccer;