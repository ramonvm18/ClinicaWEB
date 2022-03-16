<%@ Page Title="Clinica" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication2._Default" %>



<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">

    <script src="Scripts/MascaraDigitacao.js"></script>

    <p></p>
    <hr class="linhaEscura" />
      <h1> <asp:Label ID="lbTitulo" runat="server"  /></h1>
    <hr class="linhaEscura" />

    <p></p>
    <p></p>
    <p></p>

    <ul style="list-style-type: none">

        <!-- INPUT DADOS-->
        <li>
          <hr class="linhaEscura" />
        </li>

        <li>
            <asp:Label ID="lbNome" runat="server" Width="130px" /><asp:TextBox ID="txNome" runat="server" Width="300px"></asp:TextBox>
        </li>
        <br />
        <li>
            <asp:Label ID="lbSexo" runat="server" Width="130px" /> 
            <asp:Label ID="lbMasc" runat="server"/>&nbsp;<asp:RadioButton ID="rbMasc" runat="server" GroupName="sexo" />&nbsp;
            <asp:Label ID="lbFem" runat="server" />&nbsp;<asp:RadioButton ID="rbFem"  runat="server" GroupName="sexo" />&nbsp;
        </li>
        <br />
        <li>
            <asp:Label ID="lbDataNascimento" runat="server" Width="130px" /><asp:TextBox ID="txDataNascimento" runat="server" Width="100px"></asp:TextBox>
        </li>
        <br />
        <li>
             <asp:Label ID="lbPeso" runat="server" Width="130px" /><asp:TextBox ID="txPeso" runat="server" Width="100px" ></asp:TextBox>
        </li>
        <br />
        <li>
             <asp:Label ID="lbAltura" runat="server" Width="130px" /><asp:TextBox ID="txAltura" runat="server" Width="100px" ></asp:TextBox>
        </li>
        <br />
         <li>
          <hr class="linhaEscura" />
        </li>
        <!--  BUTTONS -->
        <li>
            <asp:Button ID="btOk" runat="server" Text="Salvar" Width="80px" OnClick="btOk_Click" />
            <br /><br />
            <asp:Label ID="Label2" runat="server" Width ="130px" Text="Digite o ID: "/><asp:TextBox ID="txId" runat="server" Width="100px"></asp:TextBox>
            &nbsp;&nbsp;&nbsp;
            <asp:Button ID="btBusca" runat="server" Text="Buscar" Width="80px" OnClick="btBusca_Click"/>          
            <br /><br />
            <asp:Button ID="ButtonAtualiza" runat="server" Text="Atualizar" Width="80px" OnClick="btAtualiza_Click"/>
            &nbsp;&nbsp;&nbsp;
            <asp:Button ID="ButtonDeleta" runat="server" Text="Deletar" Width="80px" OnClick="btDeleta_Click"/>
        </li>
        <br />
         <li>
           <hr class="linhaEscura" />
        </li>
        <li>
                   <asp:Label ID="mensagem" runat="server"  /> 
        </li>
        <br />
        <li>
            <asp:TextBox ID="txRelatorio" runat="server" style="width:1200px; height:300px" TextMode="MultiLine" Font-Names="Courier New"></asp:TextBox>
        </li>        
        
    </ul>

</asp:Content>
