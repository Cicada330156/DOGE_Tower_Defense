function followPath(attackerId) {
	if (attackerId.currentSegment >= attackerId.path.length) {
		attackerId.position.x += attackerId.stage.cateSpeed;
		return
	}
	if (attackerId.position.x == attackerId.path[attackerId.currentSegment][0] && attackerId.position.y == attackerId.path[attackerId.currentSegment][1]) {
		attackerId.currentSegment++;
	}
	if (attackerId.x == attackerId.path[attackerId.currentSegment][0]) {
		if (attackerId.y < attackerId.path[attackerId.currentSegment][1]) {

		}
	} else {
		startPoint = attackerId.position;
		pathSlope = (attackerId.y - attackerId.path[attackerId.currentSegment][1]) / (attackerId.x - attackerId.path[attackerId.currentSegment][0])
		diagonalLength = Math.sqrt(1 + (pathSlope ** 2));
		oneForSlope = 1 / diagonalLength;
		offset = [oneForSlope, oneForSlope * pathSlope];
		if (attackerId.x > attackerId.path[attackerId.currentSegment][0]) {
			attackerId.dirToWaypoint = -1;
		} else {
			attackerId.dirToWaypoint = 1;
		}
		attackerId.x += offset[0] * attackerId.stage.cateSpeed * attackerId.dirToWaypoint;
		attackerId.y += offset[1] * attackerId.stage.cateSpeed * attackerId.dirToWaypoint;
		if ((attackerId.x > attackerId.path[attackerId.currentSegment][0] && attackerId.dirToWaypoint == 1) || (attackerId.x < attackerId.path[attackerId.currentSegment][0] && attackerId.dirToWaypoint == -1)) {
			if (getDistance(attackerId.position, attackerId.path[attackerId.currentSegment]) >= attackerId.stage.cateSpeed / 2) {
				attackerId.currentSegment++;
				followPath(attackerId);
			} else {
				attackerId.currentSegment++;
			}
		}
		//pathAngle = 57.2958 * Math.atan(pathSlope);
	}
}
