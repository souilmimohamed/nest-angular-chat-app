import { UserEntity } from 'src/user/models';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ConnectedUserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  socketId: string;
  @ManyToOne(() => UserEntity, (user) => user.connections)
  @JoinColumn()
  user: UserEntity;
}
