export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: 'basic';
}

interface CoursePartRequirements extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: 'special';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: 'background';
}
export type CoursePart =
  | CoursePartBasic
  | CoursePartRequirements
  | CoursePartGroup
  | CoursePartBackground;
