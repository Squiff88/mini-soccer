import React, { useState, useEffect, useRef } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#000',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    padding: '32px 16px',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '110vh',
    height: '100%',
    backgroundColor: '#020617',
    color: '#fff',
    padding: '24px',
    overflow: 'scroll'
  },
  title: {
    fontSize: '6rem',
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: '-0.05em',
    // background: 'linear-gradient(to right, #4ade80, #10b981)',
    background: "linear-gradient(to right, #2d11a2, #6163ea)",
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
    border: '2px solid #334155',
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
    border: '4px solid #334155',
    overflow: 'hidden',
    marginBottom: '16px',
    position: 'relative',
    margin: '0 auto',
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
    width: '85px',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    transform: 'scale(1.98)',
    imageRendering: 'pixelated',
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
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#020617',
    color: '#fff',
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
  },
  scoreBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    marginTop: '12px',
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

const MiniSoccer = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('menu'); 
  const [difficulty, setDifficulty] = useState('medium');
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  
  const [meebitNumber, setMeebitNumber] = useState('2446');
  const [aiMeebitNumber, setAiMeebitNumber] = useState('17600');
  
  const [spriteLoaded, setSpriteLoaded] = useState(false);
  const [aiSpriteLoaded, setAiSpriteLoaded] = useState(false);
  
  const spriteImageRef = useRef(null);
  const aiSpriteImageRef = useRef(null);
  
  const FIELD_WIDTH = 800;
  const FIELD_HEIGHT = 500;
  const GOAL_WIDTH = 25;
  const GOAL_HEIGHT = 160;
  const SPRITE_WIDTH = 85;
  const SPRITE_HEIGHT = 85;
  const SPRITE_SCALE = 0.6; 
  const PLAYER_SIZE = SPRITE_WIDTH * SPRITE_SCALE; 
  const BALL_RADIUS = 14;
  const WINNING_SCORE = 3;
  

  const gameRef = useRef({
    players: [
      { x: 150, y: 200, vx: 0, vy: 0, team: 'player', lastDir: { x: 1, y: 0 }, shotTimer: 0, frame: 0, animTimer: 0 },
      { x: 150, y: 300, vx: 0, vy: 0, team: 'player', lastDir: { x: 1, y: 0 }, shotTimer: 0, frame: 0, animTimer: 0 }
    ],
    ai: [
      { x: 650, y: 200, vx: 0, vy: 0, team: 'ai', role: 'striker', lastDir: { x: -1, y: 0 }, frame: 0, animTimer: 0 },
      { x: 650, y: 300, vx: 0, vy: 0, team: 'ai', role: 'defender', lastDir: { x: -1, y: 0 }, frame: 0, animTimer: 0 }
    ],
    ball: { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2, vx: 0, vy: 0, rotation: 0 },
    keys: {},
    selectedPlayer: 0,
    possessor: null,
    isPaused: false 
  });
  
  const animationRef = useRef();

  const resetPositions = () => {
    const g = gameRef.current;
    g.ball = { x: FIELD_WIDTH / 2, y: FIELD_HEIGHT / 2, vx: 0, vy: 0, rotation: 0 };
    g.possessor = null;
    g.players.forEach((p, i) => {
      p.x = 150; p.y = i === 0 ? 200 : 300;
      p.vx = 0; p.vy = 0;
    });
    g.ai.forEach((p, i) => {
      p.x = 650; p.y = i === 0 ? 200 : 300;
      p.vx = 0; p.vy = 0;
    });
    g.keys = {};
  };

  const diffConfig = {
    easy: { aiSpeed: 2, playerSpeed: 2, ballFriction: 0.98, aiIntelligence: 0.4, shootForce: 18 },
    medium: { aiSpeed: 2.8, playerSpeed: 3.0, ballFriction: 0.985, aiIntelligence: 0.75, shootForce: 21 },
    hard: { aiSpeed: 3.5, playerSpeed: 3.5, ballFriction: 0.99, aiIntelligence: 1.0, shootForce: 25 }
  };

  const loadSpriteAsset = async (id, isPlayer) => {
    const setLoaded = isPlayer ? setSpriteLoaded : setAiSpriteLoaded;
    const ref = isPlayer ? spriteImageRef : aiSpriteImageRef;
    
    setLoaded(false);
    const spriteUrl = `https://files.meebits.app/sprites/${id}.png`;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ref.current = img;
      setLoaded(true);
    };
    img.onerror = async () => {
      try {
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(spriteUrl)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error();
        const blob = await response.blob();
        const proxyImg = new Image();
        proxyImg.onload = () => {
          ref.current = proxyImg;
          setLoaded(true);
        };
        proxyImg.src = URL.createObjectURL(blob);
      } catch (e) {
        setLoaded(false);
      }
    };
    img.src = spriteUrl;
  };

  useEffect(() => { loadSpriteAsset(meebitNumber, true); }, [meebitNumber]);
  useEffect(() => { loadSpriteAsset(aiMeebitNumber, false); }, [aiMeebitNumber]);

useEffect(() => {
  if (gameState !== 'playing') return;

  // 1. SET UP AUDIO CONTEXT
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
  // 2. GENERATE BROWN NOISE (Deep, soft rumble)
  const bufferSize = audioCtx.sampleRate * 2;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    let white = Math.random() * 2 - 1;
    // Low-pass integration to turn white noise into brown noise
    data[i] = (lastOut + (0.02 * white)) / 1.02;
    lastOut = data[i];
    data[i] *= 4.5; // High amplitude before filtering
  }

  const roar = audioCtx.createBufferSource();
  roar.buffer = buffer;
  roar.loop = true;

  // 3. STADIUM RESONANCE FILTERS
  // This filter removes the "hiss" and leaves the "rumble"
  const lowPass = audioCtx.createBiquadFilter();
  lowPass.type = 'lowpass';
  lowPass.frequency.value = 500; 

  // This adds a slight "peak" to simulate the echo of a stadium
  const resonance = audioCtx.createBiquadFilter();
  resonance.type = 'peaking';
  resonance.frequency.value = 200;
  resonance.Q.value = 3;
  resonance.gain.value = 5;

  const roarGain = audioCtx.createGain();
  roarGain.gain.value = 0.18; // Strong, noticeable background crowd

  // Connect the chain: Source -> Resonance -> LowPass -> Gain -> Speakers
  roar.connect(resonance);
  resonance.connect(lowPass);
  lowPass.connect(roarGain);
  roarGain.connect(audioCtx.destination);
  
  roar.start();

  // CLEANUP
  return () => {
    roar.stop();
    audioCtx.close();
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

  const drawSprite = (ctx, player, isSelected, isPossessor) => {
    const img = player.team === 'player' ? spriteImageRef.current : aiSpriteImageRef.current;
    const isLoaded = player.team === 'player' ? spriteLoaded : aiSpriteLoaded;
    
    if (!img || !isLoaded) {
      ctx.fillStyle = player.team === 'player' ? 'rgba(255, 255, 0, 0.5)' : 'rgba(0, 255, 255, 0.5)';
      ctx.beginPath();
      ctx.arc(player.x, player.y, PLAYER_SIZE/2, 0, Math.PI*2);
      ctx.fill();
      return;
    }

    const isMoving = Math.abs(player.vx) > 0.1 || Math.abs(player.vy) > 0.1;
    const row = getDirectionRow(player.lastDir.x, player.lastDir.y);
    let frameCol = isMoving ? Math.floor(player.frame / 5) % 2 : 0;

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
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = SPRITE_WIDTH * 2;
    tempCanvas.height = SPRITE_HEIGHT * 2;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.imageSmoothingEnabled = true;
    tempCtx.drawImage(img, sx, adjustedSY, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);
    
    const visualY = Math.floor(player.y - drawHeight + 25);

    ctx.drawImage(
      tempCanvas, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT,
      Math.floor(player.x - drawWidth / 2),
      visualY, 
      drawWidth, drawHeight
    );
    ctx.clip();
    ctx.restore();
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const settings = diffConfig[difficulty];
    
    const handleKeyDown = (e) => {
      gameRef.current.keys[e.key.toLowerCase()] = true;
      if (e.key === ' ') {
        e.preventDefault();
        gameRef.current.selectedPlayer = 1 - gameRef.current.selectedPlayer;
      }
      if (e.key === 'Enter' && gameRef.current.possessor !== null) {
        shootBall(settings.shootForce);
      }
    };
    
    const handleKeyUp = (e) => {
      gameRef.current.keys[e.key.toLowerCase()] = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    const shootBall = (force) => {
      const game = gameRef.current;
      const p = game.players[game.possessor];
      game.ball.vx = p.lastDir.x * force;
      game.ball.vy = p.lastDir.y * force;
      p.shotTimer = 25; 
      game.possessor = null;
    };

    const gameLoop = () => {
      const game = gameRef.current;
      const ball = game.ball;

      if (playerScore >= WINNING_SCORE || aiScore >= WINNING_SCORE) {
        setGameState('gameOver');
        return;
      }

      const goalTop = (FIELD_HEIGHT / 2) - (GOAL_HEIGHT / 2);

      if (!game.isPaused) {
        if (ball.x < -20 || ball.x > FIELD_WIDTH + 20 || ball.y < -20 || ball.y > FIELD_HEIGHT + 20) {
            ball.x = FIELD_WIDTH / 2;
            ball.y = FIELD_HEIGHT / 2;
            ball.vx = 0;
            ball.vy = 0;
            game.possessor = null;
        }

        game.players.forEach((p, idx) => {
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
              p.animTimer++;
              if (p.animTimer % 4 === 0) p.frame++;
            }
          } else { p.vx *= 0.8; p.vy *= 0.8; }
        });

        game.ai.forEach((ai) => {
          let tx = ball.x; let ty = ball.y;
          if (ai.role === 'striker') {
            tx = ball.x + ball.vx * 2; ty = ball.y + ball.vy * 2;
          } else {
            const defenseX = Math.max(600, ball.x + 100);
            tx = defenseX; ty = ball.y > FIELD_HEIGHT / 2 ? ball.y - 80 : ball.y + 80;
          }
          const dx = tx - ai.x, dy = ty - ai.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 5) {
            ai.vx = (dx / dist) * settings.aiSpeed;
            ai.vy = (dy / dist) * settings.aiSpeed;
            const mag = Math.sqrt(ai.vx * ai.vx + ai.vy * ai.vy);
            if (mag > 0) ai.lastDir = { x: ai.vx / mag, y: ai.vy / mag };
            ai.animTimer++; if (ai.animTimer % 4 === 0) ai.frame++;
          }
          ai.vx *= 0.88; ai.vy *= 0.88;

          const ballDist = Math.sqrt((ball.x - ai.x)**2 + (ball.y - ai.y)**2);
          if (ballDist < PLAYER_SIZE/2 + BALL_RADIUS) {
            game.possessor = null; 
            const angle = Math.atan2(ball.y - ai.y, ball.x - ai.x);
            const kickPower = 8 + (settings.aiIntelligence * 6);
            ball.vx = Math.cos(angle) * kickPower; ball.vy = Math.sin(angle) * kickPower;
          }
        });

        [...game.players, ...game.ai].forEach(p => {
          p.x += p.vx; p.y += p.vy;
          p.x = Math.max(PLAYER_SIZE/2, Math.min(FIELD_WIDTH - PLAYER_SIZE/2, p.x));
          p.y = Math.max(PLAYER_SIZE/2, Math.min(FIELD_HEIGHT - PLAYER_SIZE/2, p.y));
        });

        if (game.possessor !== null) {
          const p = game.players[game.possessor];
          ball.x = p.x + p.lastDir.x * (PLAYER_SIZE/2 + 5);
          ball.y = p.y + p.lastDir.y * (PLAYER_SIZE/2 + 5);
          ball.vx = p.vx; ball.vy = p.vy;
        } else {
          game.players.forEach((p, idx) => {
            if (p.shotTimer === 0) {
              const dist = Math.sqrt((ball.x - p.x)**2 + (ball.y - p.y)**2);
              if (dist < PLAYER_SIZE/2 + BALL_RADIUS + 2) game.possessor = idx;
            }
          });
          ball.x += ball.vx; ball.y += ball.vy;
          ball.vx *= settings.ballFriction; ball.vy *= settings.ballFriction;
          ball.rotation += (Math.abs(ball.vx) + Math.abs(ball.vy)) * 0.05;
        }

        const goalBottom = (FIELD_HEIGHT / 2) + (GOAL_HEIGHT / 2);
        if (ball.y - BALL_RADIUS < 0 || ball.y + BALL_RADIUS > FIELD_HEIGHT) ball.vy *= -0.8;
        if (ball.x - BALL_RADIUS < 0) {
          if (ball.y > goalTop && ball.y < goalBottom) handleScore('ai');
          else { ball.vx *= -0.8; ball.x = BALL_RADIUS; }
        }
        if (ball.x + BALL_RADIUS > FIELD_WIDTH) {
          if (ball.y > goalTop && ball.y < goalBottom) handleScore('player');
          else { ball.vx *= -0.8; ball.x = FIELD_WIDTH - BALL_RADIUS; }
        }
      }

      ctx.fillStyle = '#162b0e'; ctx.fillRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, FIELD_WIDTH-20, FIELD_HEIGHT-20);
      ctx.beginPath(); ctx.moveTo(FIELD_WIDTH/2, 0); ctx.lineTo(FIELD_WIDTH/2, FIELD_HEIGHT); ctx.stroke();
      
      const drawGoal = (x, isPlayerSide) => {
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= GOAL_HEIGHT; i += 12) {
            ctx.beginPath();
            ctx.moveTo(x, goalTop + i);
            ctx.lineTo(isPlayerSide ? x + GOAL_WIDTH : x - GOAL_WIDTH, goalTop + i);
            ctx.stroke();
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.strokeRect(isPlayerSide ? 0 : FIELD_WIDTH - GOAL_WIDTH, goalTop, GOAL_WIDTH, GOAL_HEIGHT);
        ctx.restore();
      };

      drawGoal(0, true);
      drawGoal(FIELD_WIDTH, false);

      game.players.forEach((p, i) => drawSprite(ctx, p, i === game.selectedPlayer, game.possessor === i));
      game.ai.forEach((p) => drawSprite(ctx, p, false, false));

      ctx.save();
      ctx.translate(ball.x, ball.y); 
      ctx.rotate(ball.rotation);
      const gradient = ctx.createRadialGradient(-BALL_RADIUS/3, -BALL_RADIUS/3, 2, 0, 0, BALL_RADIUS);
      gradient.addColorStop(0, '#ffffff'); gradient.addColorStop(1, '#cccccc');
      ctx.fillStyle = gradient;
      ctx.beginPath(); ctx.arc(0, 0, BALL_RADIUS, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = '#333'; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = '#222';
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const px = Math.cos(angle) * (BALL_RADIUS * 0.5);
        const py = Math.sin(angle) * (BALL_RADIUS * 0.5);
        ctx.beginPath(); ctx.arc(px, py, BALL_RADIUS / 4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.restore();

      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    const handleScore = (team) => {
      const g = gameRef.current;
      g.isPaused = true;
      if (team === 'player') setPlayerScore(s => s + 1);
      else setAiScore(s => s + 1);
      setTimeout(() => { resetPositions(); g.isPaused = false; }, 1200);
    };

    gameLoop();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationRef.current);
    };
  }, [gameState, difficulty, playerScore, aiScore, spriteLoaded, aiSpriteLoaded]);

  const quitToMenu = () => {
    resetPositions();
    setPlayerScore(0); 
    setAiScore(0);
    setGameState('menu');
  };

  const MeebitAvatar = ({ id, loaded }) => (
    <div style={styles.avatarCircle}>
      {!loaded && <div style={styles.avatarLoading}>LOADING...</div>}
      <div 
        style={{
          ...styles.avatarSprite,
          backgroundImage: `url(https://files.meebits.app/sprites/${id}.png)`,
          backgroundPosition: '0 -204px',
          opacity: loaded ? 1 : 0
        }}
      />
    </div>
  );

  if (gameState === 'menu') {
    return (
      <div style={styles.menuContainer}>
        <h1 style={styles.title}>Meebits Mini Soccer</h1>
        
        <div style={{...styles.avatarGrid, gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(2, 1fr)' : '1fr'}}>
          <div style={styles.avatarCard}>
            <MeebitAvatar id={meebitNumber} loaded={spriteLoaded} />
            <label style={{...styles.label, ...styles.labelGreen}}>Home ID</label>
            <input 
              type="text" 
              value={meebitNumber} 
              onChange={(e) => setMeebitNumber(e.target.value.replace(/\D/g, ''))} 
              style={styles.input}
              onFocus={(e) => e.target.style.border = '2px solid #4ade80'}
              onBlur={(e) => e.target.style.border = '2px solid transparent'}
            />
          </div>

          <div style={styles.avatarCard}>
            <MeebitAvatar id={aiMeebitNumber} loaded={aiSpriteLoaded} />
            <label style={{...styles.label, ...styles.labelBlue}}>Away ID</label>
            <input 
              type="text" 
              value={aiMeebitNumber} 
              onChange={(e) => setAiMeebitNumber(e.target.value.replace(/\D/g, ''))} 
              style={styles.input}
              onFocus={(e) => e.target.style.border = '2px solid #60a5fa'}
              onBlur={(e) => e.target.style.border = '2px solid transparent'}
            />
          </div>
        </div>

        <div style={styles.difficultyGrid}>
          {['easy', 'medium', 'hard'].map(lvl => (
            <button 
              key={lvl} 
              onClick={() => setDifficulty(lvl)} 
              style={difficulty === lvl ? {...styles.difficultyButton, ...styles.difficultyButtonActive} : styles.difficultyButton}
            >
              <span>{lvl.toUpperCase()}</span>
            </button>
          ))}

      
        </div>
          <p style={{...styles.scoreText, fontSize: "22px"}}> Controls:</p>
            <p style={{...styles.scoreText, fontSize: "18px", textAlign: 'center'}}>
              Move with  - "A","W","S","D" <br/>
          Change players with - "Spacebar" <br/>
          Shoot / Pass - "Enter"</p>
        
        <button 
          onClick={() => setGameState('playing')} 
          disabled={!spriteLoaded || !aiSpriteLoaded} 
          style={(!spriteLoaded || !aiSpriteLoaded) ? {...styles.kickoffButton, ...styles.kickoffButtonDisabled} : {...styles.kickoffButton, ...styles.kickoffButtonEnabled}}
          onMouseEnter={(e) => {
            if (spriteLoaded && aiSpriteLoaded) {
              e.target.style.backgroundColor = '#4ade80';
              e.target.style.transform = 'scale(1.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (spriteLoaded && aiSpriteLoaded) {
              e.target.style.backgroundColor = '#fff';
              e.target.style.transform = 'scale(1)';
            }
          }}
        >
          KICK OFF
        </button>
      </div>
    );
  }
  
  if (gameState === 'gameOver') {
    return (
      <div style={styles.gameOverContainer}>
        <Trophy size={100} color="#facc15" />
        <h1 style={styles.gameOverTitle}>{playerScore >= WINNING_SCORE ? 'Champion!' : 'Defeated'}</h1>
        <button 
          onClick={quitToMenu} 
          style={styles.returnButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#facc15'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}
        >
          Return to Lobby
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.scoreHeader}>
        <div style={styles.scoreBox}>
          <div style={styles.scoreInner}>
            <span style={styles.scoreText}>
              HOME - {playerScore} : AWAY - {aiScore}
            </span>
          </div>
          <span style={styles.modeBadge}>{difficulty} Mode</span>
        </div>
      </div>
      
      <canvas ref={canvasRef} width={FIELD_WIDTH} height={FIELD_HEIGHT} style={styles.canvas} />
      
      <button 
        onClick={quitToMenu} 
        style={styles.quitButton}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#dc2626';
          e.target.style.color = '#fff';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
          e.target.style.color = '#ef4444';
        }}
      >
        <RotateCcw size={14} /> Quit Match
      </button>
    </div>
  );
};

export default MiniSoccer;