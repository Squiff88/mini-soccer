// ✅ EXTRACT ALL GAME LOGIC TO SEPARATE MODULE
// Place this BEFORE your component definition

export const GameEngine = {
  // Constants (already outside, but grouping for clarity)
  CROWD_HEIGHT: 120,
  FIELD_WIDTH: 800,
  FIELD_HEIGHT: 620,
  GOAL_WIDTH: 25,
  GOAL_HEIGHT: 160,
  SPRITE_WIDTH: 85,
  SPRITE_HEIGHT: 85,
  SPRITE_SCALE: 0.6,
  PLAYER_SIZE: 51, // Precalculated: 85 * 0.6
  BALL_RADIUS: 14,

  // ✅ DIRECTION CALCULATION (pure function, no dependencies)
  getDirectionRow(dirX, dirY) {
    const angle = Math.atan2(dirY, dirX);
    const deg = (angle * 180 / Math.PI + 360) % 360;
    if (deg >= 315 || deg < 45) return 0;
    if (deg >= 45 && deg < 135) return 3;
    if (deg >= 135 && deg < 225) return 2;
    return 1;
  },

  // ✅ PLAYER MOVEMENT LOGIC
  updatePlayerMovement(player, keys, selectedIdx, playerIdx, settings) {
    if (!player.alive) return;
    
    if (player.shotTimer > 0) player.shotTimer--;
    
    if (playerIdx === selectedIdx) {
      const speed = settings.playerSpeed;
      player.vx = 0;
      player.vy = 0;
      
      if (keys['arrowleft'] || keys['a']) player.vx = -speed;
      if (keys['arrowright'] || keys['d']) player.vx = speed;
      if (keys['arrowup'] || keys['w']) player.vy = -speed;
      if (keys['arrowdown'] || keys['s']) player.vy = speed;
      
      if (player.vx !== 0 || player.vy !== 0) {
        const mag = Math.sqrt(player.vx * player.vx + player.vy * player.vy);
        player.lastDir = { x: player.vx / mag, y: player.vy / mag };
        const moveSpeed = Math.sqrt(player.vx * player.vx + player.vy * player.vy);
        player.animTimer += moveSpeed * 0.05;
        player.frame = Math.floor(player.animTimer);
      }
    } else {
      player.vx *= 0.8;
      player.vy *= 0.8;
    }
  },

  // ✅ AI MOVEMENT LOGIC
  updateAIMovement(ai, ball, settings, difficulty, FIELD_WIDTH, CROWD_HEIGHT, GOAL_HEIGHT) {
    let tx, ty;
    
    if (ai.role === 'goalkeeper' && (difficulty === 'medium' || difficulty === 'hard')) {
      const goalX = difficulty === 'hard' ? (FIELD_WIDTH - 50) : (FIELD_WIDTH - 70);
      const goalCenterY = (500 / 2) + CROWD_HEIGHT;
      
      if (ball.x > FIELD_WIDTH / 2) {
        tx = goalX;
        ty = ball.y;
        const goalTop = (500 / 2) - (GOAL_HEIGHT / 2) + CROWD_HEIGHT;
        const goalBottom = goalTop + GOAL_HEIGHT;
        ty = Math.max(goalTop + 20, Math.min(goalBottom - 20, ty));
      } else {
        tx = goalX;
        ty = goalCenterY;
      }
    } else if (ai.role === 'attacker') {
      if (difficulty === 'easy') {
        tx = ball.x;
        ty = ball.y;
      } else if (difficulty === 'medium') {
        tx = ball.x + ball.vx * 1.5;
        ty = ball.y + ball.vy * 1.5;
      } else {
        tx = ball.x + ball.vx * 2;
        ty = ball.y + ball.vy * 2;
        
        if (ball.x < FIELD_WIDTH / 3) {
          const angleToGoal = Math.atan2(
            ((500 / 2) + CROWD_HEIGHT) - ai.y,
            50 - ai.x
          );
          tx = ball.x + Math.cos(angleToGoal) * 100;
          ty = ball.y + Math.sin(angleToGoal) * 100;
        }
      }
    } else {
      tx = ball.x;
      ty = ball.y;
    }
    
    const dx = tx - ai.x;
    const dy = ty - ai.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist > 5) {
      let moveSpeed = settings.aiSpeed;
      
      if (ai.role === 'goalkeeper') {
        moveSpeed = difficulty === 'hard' ? 1.5 : difficulty === 'medium' ? 1 : settings.aiSpeed;
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
  },

  // ✅ SKELETON AI LOGIC
  updateSkeletonAI(skeleton, players, settings) {
    if (!skeleton.alive || skeleton.spawning) return null;
    
    let nearestPlayer = null;
    let minDist = Infinity;
    
    players.forEach(p => {
      if (!p.alive) return;
      const distSq = (p.x - skeleton.x) ** 2 + (p.y - skeleton.y) ** 2;
      if (distSq < minDist * minDist) {
        minDist = Math.sqrt(distSq);
        nearestPlayer = p;
      }
    });
    
    if (!nearestPlayer) return null;
    
    const dx = nearestPlayer.x - skeleton.x;
    const dy = nearestPlayer.y - skeleton.y;
    const dist = minDist;
    
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
    
    return { nearestPlayer, dist };
  },

  // ✅ BALL PHYSICS
  updateBallPhysics(ball, possessor, players, settings, PLAYER_SIZE, BALL_RADIUS) {
    if (possessor !== null) {
      const p = players[possessor];
      ball.x = p.x + p.lastDir.x * (PLAYER_SIZE / 2 + 5);
      ball.y = p.y + p.lastDir.y * (PLAYER_SIZE / 2 + 5);
      ball.vx = p.vx;
      ball.vy = p.vy;
      
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.1) {
        ball.rotation += speed * 0.15;
      }
    } else {
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.vx *= settings.ballFriction;
      ball.vy *= settings.ballFriction;
      
      const ballSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
      if (ballSpeed > 0.1) {
        const rotationSpeed = Math.min(ballSpeed * 0.15, 0.5);
        ball.rotation += rotationSpeed;
      }
    }
  },

  // ✅ POSITION CONSTRAINTS
  applyPositionConstraints(entity, FIELD_WIDTH, FIELD_HEIGHT, CROWD_HEIGHT, PLAYER_SIZE, role, difficulty, GOAL_HEIGHT) {
    if (entity.team === 'ai' && role === 'goalkeeper' && (difficulty === 'medium' || difficulty === 'hard')) {
      const minX = (FIELD_WIDTH * 2 / 3);
      const maxX = FIELD_WIDTH - PLAYER_SIZE / 2;
      entity.x = Math.max(minX, Math.min(maxX, entity.x));
      
      const goalTop = (500 / 2) - (GOAL_HEIGHT / 2) + CROWD_HEIGHT;
      const goalBottom = goalTop + GOAL_HEIGHT;
      entity.y = Math.max(goalTop, Math.min(goalBottom, entity.y));
    } else {
      entity.x = Math.max(PLAYER_SIZE / 2, Math.min(FIELD_WIDTH - PLAYER_SIZE / 2, entity.x));
      entity.y = Math.max(CROWD_HEIGHT + PLAYER_SIZE / 2, Math.min(FIELD_HEIGHT - PLAYER_SIZE / 2, entity.y));
    }
  }
};