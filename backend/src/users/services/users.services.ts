import { EntityData, wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import * as crypto from "crypto";
import { Users } from "../entities/users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly repository: EntityRepository<Users>
  ) {}

  public async create(data: any, user?: any): Promise<any> {
    if (data.login) {
      const user = await this.repository.findOne({
        login: data.login,
        deleted: false,
      });
      if (user) {
        throw new InternalServerErrorException(
          101,
          "Username - already in use"
        );
      }
    }
    const rec = this.repository.create(data);
    rec.password = await this.hashPassword(data.password);
    try {
      await this.repository.persistAndFlush(rec);
    } catch (e) {
      throw new InternalServerErrorException(2, "Database error");
    }
    return rec;
  }

  async update(id: number, updateDto?: any): Promise<any> {
    const rec = await this.repository.findOne(id);
    if (updateDto) wrap(rec).assign(updateDto);
    rec.update = new Date();
    await this.repository.persistAndFlush(rec);
    return rec;
  }

  async findById(id: number): Promise<EntityData<Users>> {
    const user = await this.repository.findOne({ id: id, deleted: false });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async validateUser(
    username: string,
    password: string
  ): Promise<EntityData<Users>> {
    const user = await this.repository.findOne({
      login: username,
      deleted: false,
    });
    if (user && (await this.hashPassword(password)) === user.password) {
      return user;
    }
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = process.env.CENTRAL_USER_SALT || "";
    return crypto
      .createHash("sha256")
      .update(`${password}${salt}`)
      .digest("hex");
  }
}
