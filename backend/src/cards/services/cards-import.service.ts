import { EntityData } from "@mikro-orm/core";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { InternalServerErrorException } from "@nestjs/common";
import { Cards } from "../entities/cards.entity";
import { Cron } from "@nestjs/schedule";
import * as fs from "fs";
import { CardsService } from "./cards.services";

@Injectable()
export class CardsImportService {
  constructor(private readonly cardsService: CardsService) {}

  @Cron("* * * * *")
  async import() {
    console.log("Cron import cards ", new Date());
  }

  async importManual() {
    const files = fs.readdirSync("./volume", { encoding: "utf8" });
    await this.importCheckFiles(files);
  }

  async importCheckFiles(files) {
    for (const f of files) {
      const fileName = this.getFileName(f);
      const recCard = await this.cardsService.findByFileName({
        name: fileName.name,
        ext: fileName.ext,
      });
      if (recCard) continue;
      const flowersName = this.parseName(f);
      const card = await this.cardsService.create({
        originalFileName: fileName.name,
        originalFileExt: fileName.ext,
        name: flowersName,
      });
      fs.renameSync(
        "./volume/" + f,
        "./volume/" + card.id + "." + fileName.ext
      );
    }
  }

  parseName(name: string) {
    const fName = this.getFileName(name);
//    let s = fName.name.replaceAll("_", " ");
    let s = fName.name.replaceAll("***", "***");
    s = s.replaceAll("  ", " ");
    s = s.replaceAll("  ", " ");
    s = s.replaceAll("  ", " ");
    while (s.length > 0) {
      const lS = s[s.length - 1];
      if ((lS >= "0" && lS <= "9") || lS === "_") {
        s = s.substring(0, s.length - 1);
      } else break;
    }
    return s.trim();
  }

  getFileName(f) {
    const dotIndex = f.lastIndexOf(".");
    return { name: f.substr(0, dotIndex), ext: f.substr(dotIndex + 1) };
  }
}
