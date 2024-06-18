import { ActionIcon, createStyles, Menu } from "@mantine/core";
import Link from "next/link";
import { TbArrowLoopLeft, TbLink } from "react-icons/tb";
import { FormattedMessage } from "react-intl";

const useStyles = createStyles((theme) => ({
  dropdown: {
    backgroundColor: "#F3F3F3",
    color: "#000",
  },
  item: {
    color: "#000000", // Чорний колір тексту
  },
}));

const NavbarShareMneu = () => {
  const { classes } = useStyles();
  return (
    <Menu
      position="bottom-start"
      withinPortal
      classNames={{ dropdown: classes.dropdown }}
    >
      <Menu.Target>
        <ActionIcon>
          <TbLink />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          href="/account/shares"
          icon={<TbLink />}
          className={classes.item}
        >
          <FormattedMessage id="navbar.links.shares" />
        </Menu.Item>
        <Menu.Item
          component={Link}
          href="/account/reverseShares"
          icon={<TbArrowLoopLeft />}
          className={classes.item}
        >
          <FormattedMessage id="navbar.links.reverse" />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarShareMneu;
