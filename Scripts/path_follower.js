/**
 * Abstract Class path_follower.
 *
 * @class PathFollower
 */
class PathFollower {
    path; //https://stackoverflow.com/questions/40658059/instance-variables-in-javascript-classes
    segment;
    segmentDistance;

    constructor(path) {
      if (this.constructor == PathFollower) {
        throw new Error("Abstract classes can't be instantiated.");
      }
      this.path = path;
      this.segment = path.segments[0];
      this.segmentDistance = 0;
    }
  
    followPath() {
      throw new Error("Method 'followPath()' must be implemented.");
    }
}

class Path {
    segments; //PathSegment array
}

class PathSegment {
    type; //"linear","circular","bezier","parabolic" - implement each (extend this class with length() methods?)
    level; // allows over/underpasses
    length; //calculated based on type and potentially start/stop points, depending on type of segment
}