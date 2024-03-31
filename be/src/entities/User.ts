import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Threads } from "./Threads";
import { Replies } from "./Replies";
import { Likes } from "./Likes";
import { Follows } from "./Follows";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
<<<<<<< HEAD
  profile_picture: string;

  @Column({ nullable: true })
  profile_description: string;
=======
  photo_profile: string;

  @Column({ nullable: true })
  photo_background: string;
>>>>>>> b5127b8b97cf4c801f56f21d4b5279ad2c2e7070

  @OneToMany(() => Threads, (thread) => thread.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  threads: Threads[];

  @OneToMany(() => Replies, (replies) => replies.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  replies: Replies[];

  @OneToMany(() => Likes, (likes) => likes.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  likes: Likes[];

  @OneToMany(() => Follows, (follows) => follows.follower, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  following: Follows[];

  @OneToMany(() => Follows, (follows) => follows.following, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  follower: Follows[];
}
