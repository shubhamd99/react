interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type IPosts = IPost[];
